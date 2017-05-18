angular
.module('runchApp')
.controller('UsersShowCtrl', UsersShowCtrl);

UsersShowCtrl.$inject = ['$stateParams', 'User'];

function UsersShowCtrl($stateParams, User) {
  const vm = this;
  // $stateParams returns a resource but nothing inside
  vm.user  = User.get($stateParams); 
}
