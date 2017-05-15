angular
.module('runchApp')
.controller('UsersShowCtrl', UsersShowCtrl);

UsersShowCtrl.$inject = ['$stateParams', 'User', '$state'];

function UsersShowCtrl($state, User, $stateParams) {
  const vm = this;
  vm.user  = User.get($stateParams);
}
