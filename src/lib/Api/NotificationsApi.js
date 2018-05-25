import Api from './Api';

export default class NotificationsApi {
  static getNotifications(rpp = 20) {
    return Api.bff.get('/users/notifications', { rpp });
  }

  static getNotificationsGrouped(to = null, rpp = 20) {
    const params = {
      rpp,
    };
    if (to) {
      params.to = to;
    }
    return Api.bff.get('/users/notifications/grouped', params);
  }

  static markNotificationsAsRead(userId) {
    return Api.bff.post(`/users/${userId}/notifications`);
  }
}
