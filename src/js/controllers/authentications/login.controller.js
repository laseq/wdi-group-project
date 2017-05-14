angular
  .module('runchApp')
  .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['User'];
function LoginCtrl(User) {
  const vm    = this;

  vm.login =  () => {
    User
      .login(vm.user)
      .$promise
      .then(data => {
        console.log(data);
      }, err => {
        console.log(err);
      });
  };
}
