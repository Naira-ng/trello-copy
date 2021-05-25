function BoardConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.board', {
    url: '/board',
    controller: 'BoardCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'board/board.html',
    title: 'Board',
    resolve: {
      auth: function(User) {
        return User.ensureAuthIs(true);
      }
    }
  });

};

export default BoardConfig;
