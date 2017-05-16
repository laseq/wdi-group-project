angular
  .module('runchApp')
  .controller('UsersProfileCtrl', UsersProfileCtrl);

UsersProfileCtrl.$inject = ['User', 'CurrentUserService'];
function UsersProfileCtrl(User, CurrentUserService) {
  const vm = this;
  vm.user = User.get({ id: CurrentUserService.currentUser._id });




}
