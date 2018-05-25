import Api from './Api';

export default class UsersApi {
  static getUser(id) {
    return Api.v1.get(`/users/${id}`);
  }

  static getUserByUsername(username) {
    return Api.v1.get('/users/show', { username });
  }

  static getUsers(ids) {
    return Api.v1.get('/users', { ids });
  }

  static getUserSettings() {
    return Api.v1.get('/users');
  }

  static updateUserSettings(params) {
    return Api.v1.put('/users', params);
  }

  static updateProfilePhoto(userId, formData, type, axiosConfig) {
    return Api.media.postWithMultipart(`/upload/user/${type}`, userId, formData, axiosConfig);
  }

  //  Monolith flagged_content.rb
  // ["Should be tagged as adult content", 6],
  // ["Offensive (rude, obscene)",         1],
  // ["Spam (ads, self-promotion)",        2],
  // ["Offtopic (trolling)",               3],
  // ["Copyright (plagiarism, stealing)",  4],
  // ["Wrong content (illustration, 3D)",  5],
  // ["Spam or abusive messages",          7],
  // ["Other",                             0]
  static reportUser(userId, reportReason) {
    return Api.reportUser.post('/moderate/save', {
      reported_item_type: 1, // FlaggedContent::TYPE_USER
      reported_item_id: userId,
      reason: reportReason,
    });
  }

  // Currently posts to the accounts/deactivate endpoint on the monolith,
  // instead of api/v1/users/deactivate endpoint.
  // The API endpoint was causing some weird behaviour with redirects and
  // other nonsense.
  // TODO: Potentially refactor this and/or the API to play nicely.
  static deleteAccount() {
    return Api.ajax().post(`${process.env.REACT_APP_MAIN_500PX_URL}/account/deactivate`);
  }

  static getAutocompleteList() {
    return Api.v1.get('/users/autocomplete');
  }
}
