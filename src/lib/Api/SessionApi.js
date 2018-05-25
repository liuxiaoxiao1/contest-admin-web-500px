import Api from './Api';

export default class SessionApi {
  static getSession() {
    return Api.v2.get('/authentication/session');
  }

  static logout() {
    return Api.ajax().post(`${process.env.REACT_APP_MAIN_500PX_URL}/logout?_method=delete`);
  }
}
