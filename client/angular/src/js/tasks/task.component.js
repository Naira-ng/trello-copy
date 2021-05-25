class TaskCtrl {
  constructor( $scope, User, $state, TaskService, Comments) {
    'ngInject';
    this._$state = $state;
    this._TaskService = TaskService;
    this._Comments = Comments;
    this.edited = false;
  }

  edit (task) {
    this.edited = true;
    this.taskItem = angular.copy(task);
  }

  editTask() {
    this._TaskService.update(this.taskItem).then(task => {
      this.task = task;
      this.edited = false;
    })
  }

  sendComment(comments) {
    this.comment = '';
    this._Comments.add(this.comment, this.task._id).then(res => comments.push(res));
  }
}

let Task = {
  bindings: {
    task: '=',
    users: '=',
    board:'=?',
    comments: '=?'
  },
  controller: TaskCtrl,
  templateUrl: 'tasks/task.html'
};

export default Task;
