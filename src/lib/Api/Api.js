import _ from 'lodash';
import axios from 'axios';
import qs from 'qs';

const API_URL = process.env.REACT_APP_API_URL;


function buildRequestUrl(rootUrl, path, params = {}, qsOptions = { arrayFormat: 'brackets' }) {
  const query = qs.stringify(params, qsOptions);

  return `${rootUrl}${path}?${query}`;
}

const mainApi = () => {
  // const csrfToken = localStorage.getItem('csrf_token');
  return axios.create({
    withCredentials: true,
    headers: {
      // 'X-CSRF-Token': csrfToken,
    },
  });
};


const uploadApi = () => {
    // const csrfToken = localStorage.getItem('csrf_token');
    return axios.create({
        withCredentials: true,
        headers: {
            'Content-Type': 'multipart/form-data'
            // 'X-CSRF-Token': csrfToken,
        },
    });
};


const postApi = () => {
    // const csrfToken = localStorage.getItem('csrf_token');
    return axios.create({
        withCredentials: true,
        headers: {
            "Content-Type":"application/x-www-form-urlencoded"
            // 'X-CSRF-Token': csrfToken,
        }
    });
};



// Makes requests to main API with a content-type of application/javascript
// This is currently only needed to report a user without an error occuring
const acceptJavascript = () => {
  return axios.create({
    withCredentials: true,
    headers: {
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
      return api().post(buildRequestUrl(rootUrl, path, params), {});
    }

    static postWithMultipart(path, formData, config = {}) {


      return api().post(buildRequestUrl(rootUrl, path), formData, config);
    }


    static postObject(path, postData, config = {}) {

        return api().post(`${rootUrl}${path}`, new URLSearchParams(postData), config);
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

Api.upload = buildApi(uploadApi, API_URL);
Api.commonPost = buildApi(postApi, API_URL);


Api.reportUser = buildApi(acceptJavascript, API_URL);

export default Api;
