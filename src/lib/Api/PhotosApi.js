import _ from 'lodash';
import Api from './Api';

const IMAGE_SIZES = [31, 36];
const DEFAULT_PHOTOS_PARAMS = {
  page: 1,
  rpp: 20,
  image_size: IMAGE_SIZES,
  include_states: 1,
};

export default class PhotosApi {
  static getPhoto(id) {
    const params = {
      image_size: IMAGE_SIZES,
      include_states: 1,
    };

    return Api.v1.get(`/photos/${id}`, params);
  }

  static getFeaturePhotos(feature, page, rpp = 50) {
    const params = {
      feature,
      page,
      rpp,
    };

    return Api.v1.get('/photos', _.merge({}, DEFAULT_PHOTOS_PARAMS, params));
  }

  static getUserPhotos(id, page) {
    const params = {
      feature: 'user',
      user_id: id,
      rpp: 50,
      page,
    };

    return Api.v1.get('/photos', _.merge({}, DEFAULT_PHOTOS_PARAMS, params));
  }

  static getUserPhotosByUsername(username, page) {
    const params = {
      feature: 'user',
      username,
      rpp: 50,
      page,
    };

    return Api.v1.get('/photos', _.merge({}, DEFAULT_PHOTOS_PARAMS, params));
  }

  static likePhoto(id) {
    return Api.v1.post(`/photos/${id}/vote`, _.merge({ vote: 1 }, DEFAULT_PHOTOS_PARAMS));
  }

  static unlikePhoto(id) {
    return Api.v1.delete(`/photos/${id}/vote`, _.merge({ vote: 1 }, DEFAULT_PHOTOS_PARAMS));
  }
}
