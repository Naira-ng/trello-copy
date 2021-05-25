function TasksConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.tasks', {
    url: '/board/:boardId',
    controller: 'TasksCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'tasks/tasks.html',
    title: 'Tasks',
    resolve: {
      auth: function(User) {
        return User.ensureAuthIs(true);
      }
    }
  });

};

export default TasksConfig;
