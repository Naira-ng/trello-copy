class AuthCtrl {
  constructor(User, $state) {
    'ngInject';

    this._User = User;
    this._$state = $state;

    this.title = $state.current.title;
    this.authType = $state.current.name.replace('app.', '');

  }

  submitForm() {
    this.isSubmitting = true;

    this._User.attemptAuth(this.authType, this.formData).then(
      (res) => {
        this._$state.go('app.board');
      })
        .catch((err) => {
          console.log(err, '-----------')
          this.isSubmitting = false;
          this.errMsg = (err.data && err.data.message) || err.message || err;
        });
  }
}

export default AuthCtrl;
