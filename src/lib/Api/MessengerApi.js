import { Strophe, $pres, $msg, $iq } from 'strophe.js';
import 'strophejs-plugin-rsm';
import 'strophejs-plugin-mam';
import 'strophejs-plugin-roster';

import { stringToBoolean } from 'lib/helpers';

import Api from './Api';

const XMPP_URL = process.env.REACT_APP_MESSENGER_WEBSOCKET_URL;
const XMPP_DOMAIN = process.env.REACT_APP_MESSENGER_DOMAIN;

/*
  The full list of Strophe status codes for reference
  Strophe.Status = {
    ATTACHED: 8
    AUTHENTICATING: 3
    AUTHFAIL: 4
    CONNECTED: 5
    CONNECTING: 1
    CONNFAIL: 2
    CONNTIMEOUT: 10
    DISCONNECTED: 6
    DISCONNECTING: 7
    ERROR: 0
    REDIRECT: 9
  }
*/

export default class MessengerApi {
  static getAuthToken() {
    return Api.v1.get('/messenger/token')
      .then((response) => {
        const { token } = response.data;

        return token;
      });
  }

  static connect(userId, authToken) {
    return new Promise((resolve, reject) => {
      const connection = new Strophe.Connection(XMPP_URL);
      // Used for testing. Logs all xml traffic.
      // connection.xmlOutput = message => console.log('out', message);
      // connection.xmlInput = message => console.log('in', message);

      // See above for full list of Strophe Status codes
      const onConnect = (status, error) => {
        switch (status) {
          case Strophe.Status.CONNECTING:
            // console.log('Strophe is connecting.');
            break;
          case Strophe.Status.CONNECTED: {
            connection.roster.init(connection);

            // Handle pings
            const onPing = (ping) => {
              const id = ping.getAttribute('id');
              const iq = $iq({
                id,
                to: XMPP_DOMAIN,
                from: connection.authzid,
                type: 'result',
              });

              connection.sendIQ(iq);

              return true;
            };
            connection.addHandler(onPing, 'urn:xmpp:ping', null, null, null, null, { matchBareFromJid: true });

            resolve(connection);
            break;
          }
          case Strophe.Status.CONNFAIL:
          case Strophe.Status.AUTHFAIL:
          case Strophe.Status.ERROR: {
            const connectionError = { status, error };
            reject(connectionError);
            break;
          }
          case Strophe.Status.DISCONNECTING:
            // console.log('Strophe is disconnecting.');
            break;
          case Strophe.Status.DISCONNECTED:
            // console.log('Strophe is disconnected.');
            break;
          default:
            break;
        }
      };

      connection.connect(`${userId}@${XMPP_DOMAIN}`, authToken, onConnect);
    });
  }

  static disconnect(connection) {
    return new Promise(((resolve) => {
      connection.reset();
      connection.disconnect();
      resolve();
    }));
  }

  static fetchRoster(connection) {
    return new Promise(((resolve) => {
      connection.roster.get((response) => {
        const items = response || [];

        const roster = items.map(item => ({
          jid: item.jid,
          userId: item.jid.split('@')[0],
          subscription: item.subscription,
        }));

        resolve(roster);
      });
    }));
  }

  // Currently, if no messages have ever been sent b/t you and a user, this query appears
  // to never call the `onMessage` or `onComplete` handlers below.
  // So, it doesn't call the action creator and actually create any messageHistory state,
  // which was causing an error when trying to send/receive a message and grabbing the
  // messages key from the state. Error handling has been added to the messageHistoryReducer,
  // but it would be nice to clean that up.
  static fetchMessages(connection, userId, before = '', maxResults = 50) {
    return new Promise((resolve, reject) => {
      const messages = [];

      connection.mam.query(connection.authzid, {
        with: `${userId}@${connection.domain}`,
        max: maxResults,
        before,
        onMessage: (message) => {
          const id = message.querySelector('result').getAttribute('id');
          const fwd = message.querySelector('forwarded');
          const timestamp = new Date(fwd.querySelector('delay').getAttribute('stamp'));
          const msg = fwd.querySelector('message');
          const from = Strophe.getBareJidFromJid(msg.getAttribute('from'));
          const to = Strophe.getBareJidFromJid(msg.getAttribute('to'));
          const body = msg.querySelector('body').textContent;
          const type = msg.getAttribute('type');

          const messageDetails = {
            id,
            timestamp,
            from,
            to,
            body,
            type,
          };

          messages.push(messageDetails);

          return true;
        },
        onComplete: (response) => {
          try {
            const totalMessageCount = response.querySelector('count').textContent;

            const complete = response.querySelector('fin').getAttribute('complete');
            const allMessagesFetched = stringToBoolean(complete);

            // The ids below are of the first and last message id we've most recently fetched.
            // When we want to fetch more messages, we will have to pass in the
            // `oldestMessageIdFetched` as the `before` argument above.
            const first = response.querySelector('first');
            const last = response.querySelector('last');
            const oldestMessageIdFetched = first ? first.textContent : null;
            const newestMessageIdFetched = last ? last.textContent : null;

            const result = {
              totalMessageCount,
              allMessagesFetched,
              oldestMessageIdFetched,
              newestMessageIdFetched,
            };

            resolve({ messages, result });
          } catch (error) {
            reject(error);
          }
        },
      });
    });
  }

  static sendMessage(connection, fromId, toId, body) {
    return new Promise((resolve) => {
      const sender = connection.authzid;
      const recipient = `${toId}@${connection.domain}`;
      const messageId = connection.getUniqueId();
      const msg = $msg({
        id: messageId,
        from: sender,
        to: recipient,
        type: 'chat',
      })
        .c('body')
        .t(body);

      connection.send(msg);

      // TODO: Currently faking a message to add directly to the history state.
      // This might be a bad idea.
      const message = {
        id: messageId,
        from: sender,
        to: toId,
        body,
        timestamp: new Date(),
      };

      resolve(message);
    });
  }

  static listenForIncomingChat(connection, messageHandler) {
    function onChatReceived(response) {
      const id = response.querySelector('stanza-id').getAttribute('id');

      const sent = response.querySelector('sent');
      let message;
      if (sent && sent.getAttribute('xmlns').match('carbons')) {
        // carbon message
        // message is nested within <sent>
        message = sent.querySelector('message');
      } else {
        message = response;
      }

      const to = message.getAttribute('to');
      const from = message.getAttribute('from');
      const body = message.querySelector('body').textContent;
      const type = message.getAttribute('type');
      const timestamp = new Date();

      const incomingMessage = {
        id,
        to,
        from,
        body,
        type,
        timestamp,
      };
      messageHandler(incomingMessage);
      return true;
    }

    return connection.addHandler(onChatReceived, null, 'message', 'chat', null, null, { matchBareFromJid: true });
  }

  static listenForIncomingSubscription(connection, subscribeHandler) {
    function onSubscribeReceived(message) {
      const from = message.getAttribute('from');
      subscribeHandler(from);
      return true;
    }

    return connection.addHandler(onSubscribeReceived, null, 'presence', 'subscribe', null, null, { matchBareFromJid: true });
  }

  static stopListeningForMessages(connection, handlerRef) {
    connection.deleteHandler(handlerRef);
  }

  static enableCarbonMessages(connection) {
    return new Promise((resolve) => {
      const iq = $iq({
        id: connection.getUniqueId(),
        type: 'set',
      }).c('enable', { xmlns: 'urn:xmpp:carbons:2' });

      connection.sendIQ(iq, (response) => {
        resolve(response);
      });
    });
  }

  static addToRoster(connection, userId) {
    return new Promise((resolve) => {
      const jid = `${userId}@${connection.domain}`;
      connection.roster.add(jid, null, [], () => {
        // Optimistically setting the subscription to "to", assuming that
        // the subscripiton request below will be successfully sent
        const rosterItem = {
          jid,
          userId,
          subscription: 'to',
        };

        // Subscribe
        connection.roster.subscribe(jid);

        resolve(rosterItem);
      });
    });
  }

  static removeFromRoster(connection, jid) {
    return new Promise((resolve) => {
      connection.roster.remove(jid);
      resolve();
    });
  }

  static acceptSubscription(connection, userId) {
    return new Promise((resolve) => {
      const jid = `${userId}@${connection.domain}`;
      connection.roster.authorize(jid);
      resolve();
    });
  }

  static denySubscription(connection, userId) {
    return new Promise((resolve) => {
      const jid = `${userId}@${connection.domain}`;
      connection.roster.unauthorize(jid);
      resolve();
    });
  }

  static blockUser(connection, userId) {
    return new Promise((resolve, reject) => {
      const jid = `${userId}@${connection.domain}`;
      const sender = connection.authzid;
      const iq = $iq({
        id: connection.getUniqueId(),
        from: sender,
        type: 'set',
      })
        .c('block', { xmlns: 'urn:xmpp:blocking' })
        .c('item', { jid });

      connection.sendIQ(iq, () => resolve(userId), (error) => {
        const errorCode = error.querySelector('error').getAttribute('code');
        reject(errorCode);
      });
    });
  }

  static unblockUser(connection, userId) {
    return new Promise((resolve, reject) => {
      const jid = `${userId}@${connection.domain}`;
      const iq = $iq({
        id: connection.getUniqueId(),
        type: 'set',
      })
        .c('unblock', { xmlns: 'urn:xmpp:blocking' })
        .c('item', { jid });

      connection.sendIQ(iq, () => resolve(userId), (error) => {
        const errorCode = error.querySelector('error').getAttribute('code');
        reject(errorCode);
      });
    });
  }

  static fetchBlockedUsersList(connection) {
    return new Promise((resolve) => {
      const iq = $iq({
        id: connection.getUniqueId(),
        type: 'get',
      })
        .c('blocklist', { xmlns: 'urn:xmpp:blocking' });

      connection.sendIQ(iq, (response) => {
        const blockList = response.querySelector('blocklist');
        const items = blockList.getElementsByTagName('item');

        const blockedUsers = items && Array.from(items).map(item => ({
          userId: item.getAttribute('jid').split('@')[0],
        }));

        resolve(blockedUsers);
      });
    });
  }

  static sendPresence(connection) {
    connection.send($pres({ id: connection.getUniqueId() }));
  }

  static fetchOfflineMessageCount(connection) {
    return new Promise((resolve) => {
      const iq = $iq({
        id: connection.getUniqueId(),
        type: 'get',
      }).c('query', {
        xmlns: 'http://jabber.org/protocol/disco#info',
        node: 'http://jabber.org/protocol/offline',
      });

      connection.sendIQ(iq, (response) => {
        const count = response.querySelector('[var="number_of_messages"]').textContent;
        resolve(parseInt(count, 10));
      });
    });
  }

  static fetchOfflineMessageHeaders(connection) {
    return new Promise((resolve) => {
      const iq = $iq({
        id: connection.getUniqueId(),
        type: 'get',
      }).c('query', {
        xmlns: 'http://jabber.org/protocol/disco#items',
        node: 'http://jabber.org/protocol/offline',
      });

      connection.sendIQ(iq, (response) => {
        const items = response.getElementsByTagName('item');
        const offlineMessageHeaders = items && Array.from(items).map(item => ({
          userId: item.getAttribute('name').split('@')[0],
          node: item.getAttribute('node'),
        }));

        resolve(offlineMessageHeaders);
      });
    });
  }

  static removeOfflineMessages(connection, nodes) {
    return new Promise((resolve) => {
      const iq = $iq({
        id: connection.getUniqueId(),
        type: 'set',
      }).c('offline', {
        xmlns: 'http://jabber.org/protocol/offline',
      });

      nodes.forEach((node) => {
        iq.c('item', { action: 'remove', node });
        iq.up();
      });

      connection.sendIQ(iq, () => {
        resolve();
      });
    });
  }

  static cacheLastMessage(userId, message, timestamp, direction) {
    localStorage.setItem(`messenger-lastMessage-${userId}`, message);
    localStorage.setItem(`messenger-lastMessageTimestamp-${userId}`, timestamp);
    localStorage.setItem(`messenger-lastMessageDirection-${userId}`, direction);
  }

  static getCachedLastMessage(userId) {
    const message = localStorage.getItem(`messenger-lastMessage-${userId}`);
    const timestamp = localStorage.getItem(`messenger-lastMessageTimestamp-${userId}`);
    const direction = localStorage.getItem(`messenger-lastMessageDirection-${userId}`);
    if (message && timestamp && direction) return { message, timestamp, direction };
    return null;
  }
}
