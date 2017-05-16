angular
.module('runchApp')
.controller('DashboardCtrl', DashboardCtrl);

DashboardCtrl.$inject = ['Group', '$stateParams', '$state', 'CurrentUserService'];

function DashboardCtrl(Group, $stateParams, $state, CurrentUserService) {
  const vm = this;
  vm.loggedInUser = CurrentUserService.currentUser;
  console.log(vm.loggedInUser);

  groupsIndex();

  function groupsIndex() {
    vm.all = Group.query();
  }
}
