angular
  .module('runchApp')
  .controller('UsersProfileCtrl', UsersProfileCtrl);

UsersProfileCtrl.$inject = ['User', 'TokenService'];
function UsersProfileCtrl(User, TokenService) {
  const vm = this;

  vm.user = User.get({ id: TokenService.decodeToken().id });
}
