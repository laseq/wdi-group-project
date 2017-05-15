angular
.module('runchApp')
.controller('UsersEditCtrl', UsersEditCtrl);

UsersEditCtrl.$inject = ['User', '$state', 'CurrentUserService'];

function UsersEditCtrl(User, $state, CurrentUserService) {
  const vm = this;

  vm.user = User.get({id: CurrentUserService.currentUser._id });
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
