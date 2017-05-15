angular
  .module('runchApp')
  .controller('UsersIndexCtrl', UsersIndexCtrl);

UsersIndexCtrl.$inject = ['User', '$stateParams', '$state'];
function UsersIndexCtrl(User, $state, $stateParams) {
  const vm = this;
  vm.users = User.get($stateParams);
}
