import User from "../services/user.service";

class AppHeaderCtrl {
  constructor(AppConstants, User, $scope, JWT, $state) {
    'ngInject';

    this.appName = AppConstants.appName;
    this.currentUser = User.current;
    this._JWT = JWT;
    this._$state = $state;


    $scope.$watch('User.current', (newUser) => {
      this.currentUser = newUser;
    })
  }
  logout() {
    this.current = null;
    this._JWT.destroy();
    this._$state.go('app.login', null, { reload: true });
  }
}

let AppHeader = {
  controller: AppHeaderCtrl,
  templateUrl: 'layout/header.html'
};

export default AppHeader;
