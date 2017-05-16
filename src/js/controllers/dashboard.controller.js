angular
.module('runchApp')
.controller('DashboardCtrl', DashboardCtrl);

DashboardCtrl.$inject = ['Group', 'TokenService', 'User'];

function DashboardCtrl(Group, TokenService, User) {
  const vm = this;
  vm.all = Group.query();
  vm.user = User.get({ id: TokenService.decodeToken().id });
}
