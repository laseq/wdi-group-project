angular
.module('runchApp')
.controller('UsersShowCtrl', UsersShowCtrl);

UsersShowCtrl.$inject = ['$stateParams', 'User', '$state'];

function UsersShowCtrl($state, User) {
  const vm = this;
  vm.user  = User.get($state); // $stateParams returns a resource but nothing inside
  // console.log(vm.user);
}
