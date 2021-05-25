
class TasksCtrl {
  constructor( User, $sce, $rootScope, AppConstants, $window, $http, Board, TaskService, Comments) {
    'ngInject';

    this.statuses =  [ 'open', 'inProgress', 'inReview', 'resolved' ];
    this._$window = $window;
    this._User = User;
    this._Board = Board;
    this._Comments = Comments;
    this.TaskService = TaskService;
    this.board = JSON.parse(this._$window.localStorage.board);
    this.currentUser = User.current;
    this.usersByIds = {};
    this.deletedTask = {};
    this.delStatus = {};
    this.users = [];
    this.task = {};

    this.centerAnchor = true;
    this.toggleCenterAnchor = function () {this.centerAnchor = !this.centerAnchor}
    this.tasksByStatus = {
       open: [],
      inProgress: [],
      inReview: [],
      resolved: []
    };
    this.board.assigned_users = this.board.assigned_users || [];
    TaskService.getAll(this.board._id).then((res) => this.tasks = res);
    this.init();
  }
  onDropComplete (data,evt, status){
    if(!data) {
      return false;
    }
    let index = this.tasksByStatus[status].indexOf(data);
    if (index == -1) {
      this.tasksByStatus[status].push(data);
      data.status = status;
      this.TaskService.update(data);
    }
  }

  onDragSuccess (data,evt, status){
    if(!data) {
      return false;
    }
    let index =  this.tasksByStatus[status].indexOf(data);
    if (index > -1) {
      this.tasksByStatus[status].splice(index, 1);
    }
  }

  init() {
    this._User.getAll().then(users => {
      this.users = users;
      this.users.forEach(u => {
        this.usersByIds[u._id] = u;
      })
    })
    this.TaskService.getAll(this.board._id).then(tasks => {
      console.log(tasks, 'tasks')
       tasks.forEach(task => {
         this.tasksByStatus[task.status].push(task);
       })
    })
  }

  updateBoard() {
    this._Board.update(this.board.assigned_users, this.board._id).then(board => {
      this._$window.localStorage.board = JSON.stringify(board);
    })
  }

  addUser(id) {
    console.log(id)
    if(!this.board.assigned_users.includes(id) && id !== this.board.owner) {
      this.board.assigned_users.push(id);
      this.updateBoard();
    }
  }

  removeUser(index) {
    this.board.assigned_users.splice(index, 1);
    this.updateBoard();
  }

  addTask() {
    this.task.board = this.board._id;
    this.TaskService.add(this.task).then(res => {
      this.tasksByStatus[res.status].push(res);
      $('#taskModal').modal('hide');
    })
  }

  openTask (task) {
    this.taskPreview = task;
      this._Comments.getAll(task._id).then(res => {
        console.log(res, '----------')
        this.comments = res || []
      });
  }

  delete() {
    this.TaskService.destroy(this.deletedTask._id).then(() => {
        this.tasksByStatus[this.delStatus] = this.tasksByStatus[this.delStatus].filter(t => t._id !== this.deletedTask._id);
      $('#deleteModal').modal('hide');

    })
        .catch(err => this.errMsg = err.message || err)
  }


  resetCommentForm() {
    this.commentForm = {
      isSubmitting: false,
      body: '',
      errors: []
    }
  }

}


export default TasksCtrl;