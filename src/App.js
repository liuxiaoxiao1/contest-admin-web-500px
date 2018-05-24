import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { useStrict } from 'mobx'
import { observer } from 'mobx-react'

import Routes from './routes';
import Loading from './components/Loading/Loading_new';

import User from './stores/user'

useStrict(true)

@observer
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }

  }

  // We need to fetch session data immediately upon loading the app
  componentDidMount() {
    if (!User.sessionActive) {
      this.fetchSession();
    }
  }
  fetchSession() {
    User.getLoginUserInfo();
  }

  // Determine we have the basic data required to start the app
  // Required:
  //  * Session data (contains CSRF token, authorizations, current user)

  isAppReady() {
    return User.sessionActive;
  }

  render() {
    if (!this.isAppReady()) {
      return <Loading isJustUi={true}/>;
    }

    console.log('user update', User.user);

    return (
        <Routes user={User.user}/>
    );
  }
}

App.defaultProps = {
  sessionActive: false,
};

App.propTypes = {
  sessionActive: PropTypes.bool,
};



export default App;
