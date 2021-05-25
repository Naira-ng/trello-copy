class BoardCtrl {
  constructor(JWT, User, AppConstants, $scope, $http, $state, $window, $rootScope, Board) {
        'ngInject';

    this.appName = AppConstants.appName;
    this._$scope = $scope;
    this._AppConstants = AppConstants;
    this._$http = $http;
    this._JWT = JWT;
    this._User = User;
    this._Board = Board;
    this._$state = $state;
    this._$window = $window;
    this._$rootScope = $rootScope;
    this.isSubmitting = false;
    Board.getAll().then((boards) => this.boards = boards)
        .catch(err => this.errMsg = err.message || err);
  }


  addBoard() {
    let token = this._JWT.get();
    if(token) {
      this.board.background = this.board.background || this._AppConstants.defaultUrl
      this._Board.add(this.board).then((res) => {
        this.board = {};
        this.boards.push(res)
      })
        .catch(err => {
          this.errMsg = err.message || err
        })
  }
  }
  goToTasks (board) {
    this._$window.localStorage.board = JSON.stringify(board);
    this._$state.go('app.tasks',{boardId: board._id});
  }



  changeList(newList) {
    this._$scope.$broadcast('setListTo', newList);
  }


}

export default BoardCtrl;
