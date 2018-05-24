import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import NotFound from './NotFound';
import Util from '../utils/web-utils'

import User from '../stores/user'

function AuthorizedRoute({
  feature,
  authorizations,
  adminOnly,
  loggedInOnly,
  component: Component,
  ...rest
}) {
  return (<Route
    {...rest}
    render={(props) => {
      let user = User.user;
      const loggedInAuthorized = loggedInOnly ? !Util.isEmptyObj(user) : true;
      const featureAuthorized = feature ? authorizations.get(feature) : true;
      const admin = user ? user.admin : false;
      const adminAuthorized = adminOnly ? admin : true;

      console.log('props', props);

      //把登录的校验单独拿出来了
      if(!loggedInAuthorized) {
          props.history.push('/login', {goBack: true})
      }

      if (featureAuthorized && adminAuthorized) {
        return <Component {...props} />;
      }
      return <NotFound />;
    }}
  />);
}

AuthorizedRoute.defaultProps = {
  authorizations: {},
  feature: null,
  adminOnly: false,
  loggedInOnly: true,
};

AuthorizedRoute.propTypes = {
  feature: PropTypes.string,
  adminOnly: PropTypes.bool,
  loggedInOnly: PropTypes.bool,
  authorizations: PropTypes.object,
  component: PropTypes.func.isRequired,
};


export default AuthorizedRoute;
