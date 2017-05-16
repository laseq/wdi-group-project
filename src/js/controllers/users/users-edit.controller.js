angular
.module('runchApp')
.controller('UsersEditCtrl', UsersEditCtrl);

UsersEditCtrl.$inject = ['User', '$state', 'TokenService', 'CurrentUserService'];

function UsersEditCtrl(User, $state, TokenService, CurrentUserService) {
  const vm = this;

  vm.user = User.get({ id: TokenService.decodeToken().id });

  vm.update = usersUpdate;

  function usersUpdate() {
    User
    .update({ id: vm.user.id }, vm.user)
    .$promise
    .then(user => {
      CurrentUserService.getUser();
      $state.go('usersProfile', { id: user._id });
    });
  }
}
