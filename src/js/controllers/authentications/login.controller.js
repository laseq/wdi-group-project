angular
  .module('runchApp')
  .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['User', 'CurrentUserService', '$state'];
function LoginCtrl(User, CurrentUserService, $state) {
  const vm    = this;

  vm.login =  () => {
    User
      .login(vm.user)
      .$promise
      .then(() => {
        CurrentUserService.saveUser();
        $state.go('dashboard');
      }, err => {
        console.log(err);
      });
  };
}
