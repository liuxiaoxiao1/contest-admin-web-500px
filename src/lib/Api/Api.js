import _ from 'lodash';
import axios from 'axios';
import qs from 'qs';

const API_URL = process.env.REACT_APP_API_URL;
const BFF_URL = process.env.REACT_APP_WEB_BFF_URL;
const MEDIA_URL = process.env.REACT_APP_MEDIA_URL;

function buildRequestUrl(rootUrl, path, params = {}, qsOptions = { arrayFormat: 'brackets' }) {
  const query = qs.stringify(params, qsOptions);

  return `${rootUrl}${path}?${query}`;
}

const mainApi = () => {
  const csrfToken = localStorage.getItem('csrf_token');
  return axios.create({
    withCredentials: true,
    headers: {
      'X-CSRF-Token': csrfToken,
    },
  });
};

const webBff = () => {
  const csrfToken = localStorage.getItem('csrf_token');
  return axios.create({
    withCredentials: true,
    headers: {
      AUTHORIZATION: `PxToken ${csrfToken}`,
    },
  });
};

const media = () => {
  const csrfToken = localStorage.getItem('csrf_token');
  return axios.create({
    withCredentials: true,
    headers: {
      'X-CSRF-Token': csrfToken,
    },
  });
};

// Makes requests to main API with a content-type of application/javascript
// This is currently only needed to report a user without an error occuring
const acceptJavascript = () => {
  const csrfToken = localStorage.getItem('csrf_token');
  return axios.create({
    withCredentials: true,
    headers: {
      'X-CSRF-Token': csrfToken,
      Accept: 'application/javascript',
    },
  });
};

function buildApi(api, rootUrl) {
  return class {
    static ajax() {
      return api();
    }

    static get(path, params = {}) {
      return api().get(buildRequestUrl(rootUrl, path, params));
    }

    static post(path, params = {}) {
      return api().post(buildRequestUrl(rootUrl, path, params));
    }

    static postWithMultipart(path, userId, formData, config = {}) {
      const params = {
        user_id: userId,
        authenticity_token: localStorage.getItem('csrf_token'),
      };

      return api().post(buildRequestUrl(rootUrl, path, params), formData, config);
    }

    static put(path, params = {}) {
      return api().post(buildRequestUrl(rootUrl, path, _.merge({ _method: 'put' }, params)));
    }

    static delete(path, params = {}) {
      return api().post(buildRequestUrl(rootUrl, path, _.merge({ _method: 'delete' }, params)));
    }
  };
}

const Api = buildApi(mainApi, API_URL);
Api.v1 = buildApi(mainApi, `${API_URL}/v1`);
Api.v2 = buildApi(mainApi, `${API_URL}/v2`);
Api.bff = buildApi(webBff, BFF_URL);
Api.media = buildApi(media, MEDIA_URL);
Api.reportUser = buildApi(acceptJavascript, API_URL);

export default Api;
