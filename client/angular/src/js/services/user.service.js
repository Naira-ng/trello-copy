export default class User {
  constructor(JWT, AppConstants, $http, $state, $q, $window) {
    'ngInject';

    this._JWT = JWT;
    this._AppConstants = AppConstants;
    this._$http = $http;
    this._$state = $state;
    this._$q = $q;
    this._$window = $window;

    this.current = null;

  }


  attemptAuth(type, credentials) {
    return this._$http({
      url: this._AppConstants.api + '/auth/' + type,
      method: 'POST',
      data: {
        user: credentials
      }
    }).then(
      (res) => {
        this._JWT.save(res.data.user.token);
        this.current = res.data.user;
        this.save(res.data.user)
        return res;
      }
    );
  }

  save(user) {
    this._$window.localStorage[this._AppConstants.user] = JSON.stringify(user);
  }

  get() {
    return this._$window.localStorage[this._AppConstants.user];
  }

  destroy() {
    this._$window.localStorage.removeItem(this._AppConstants.user);
  }

  update(fields) {
    return this._$http({
      url:  this._AppConstants.api + '/user',
      method: 'PUT',
      data: { user: fields }
    }).then(
      (res) => {
        this.current = res.data.user;
        return res.data.user;
      }
    )
  }

  logout() {
    this.current = null;
    this._JWT.destroy();
    this._$state.go(this._$state.$current, null, { reload: true });
  }

  verifyAuth() {
    let deferred = this._$q.defer();
    // check for JWT token
    if (!this._JWT.get()) {
      deferred.resolve(false);
      return deferred.promise;
    }
    if (!this.get()) {
      deferred.resolve(false);
      return deferred.promise;
    }
    this.current = JSON.parse(this.get());
    deferred.resolve(true);
    return deferred.promise;
  }


  ensureAuthIs(bool) {
    let deferred = this._$q.defer();

    this.verifyAuth().then((authValid) => {
      if (authValid !== bool) {
        this._$state.go('app.home')
        deferred.resolve(false);
      } else {
        deferred.resolve(true);
      }

    });

    return deferred.promise;
  }

  getAll() {
    return this._$http({
      url: this._AppConstants.api + '/users/',
      method: 'GET'
    }).then((res) => res.data.users);
  }

}
