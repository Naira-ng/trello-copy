export default class Comments {
  constructor(AppConstants, $http, JWT) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;
    this._JWT = JWT;
  }


  // Add a comment to an article
  add(comment, taskId) {
    return this._$http({
      url: `${this._AppConstants.api}/comment`,
      method: 'POST',
      headers: {
        Authorization: this._JWT.get()
      },
      data: { comment: comment, task: taskId }
    }).then((res) => res.data);

  }

  getAll(taskId) {
    return this._$http({
      url: `${this._AppConstants.api}/comment`,
      method: 'GET',
      headers: {
        Authorization: this._JWT.get()
      },
      params: {
        taskId: taskId
      }
    }).then((res) => res.data.comments);

  }

  destroy(commentId, articleSlug) {
    return this._$http({
      url: `${this._AppConstants.api}/articles/${articleSlug}/comments/${commentId}`,
      method: 'DELETE',
    });
  }

}
