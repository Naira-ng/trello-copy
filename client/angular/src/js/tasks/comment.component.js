class CommentCtrl {
  constructor(User) {
    'ngInject';

  }
}

let Comment = {
  bindings: {
    data: '=',
    users: '='
  },
  controller: CommentCtrl,
  templateUrl: 'tasks/comment.html'
};

export default Comment;
