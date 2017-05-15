angular
.module('runchApp')
.controller('UsersEditCtrl', UsersEditCtrl);

UsersEditCtrl.$inject = ['User', '$state', '$stateParams'];

function UsersEditCtrl(User, $state, $stateParams) {
  const vm = this;

  vm.user   = User.get($stateParams);
  vm.update = usersUpdate;

  function usersUpdate() {
    User
    .update({ id: $stateParams.id }, vm.user)
    .$promise
    .then(() => {
      $state.go('usersShow');
    });
  }
}
