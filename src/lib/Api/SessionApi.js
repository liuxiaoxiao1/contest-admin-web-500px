import Api from './Api';

//暂时没有用到


export default class SessionApi {
  static getSession() {
    return Api.v2.get('/authentication/session');
  }

  static logout() {
    return Api.ajax().post(`/logout?_method=delete`);
  }
}
