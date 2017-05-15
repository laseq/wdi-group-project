angular
.module('runchApp')
.controller('DashboardCtrl', DashboardCtrl);


// show the user's groups by gettig the current users id, and seeing if it matches any of those in a group's members array?

DashboardCtrl.$inject = ['Group', '$stateParams', '$state', 'CurrentUserService'];

function DashboardCtrl(Group, $stateParams, $state, CurrentUserService) {
  const vm = this;
  vm.user = CurrentUserService.currentUser.id;

  const usersGroups = [];

  groupsIndex();

  function groupsIndex() {
    vm.all = Group.query();
    // console.log(vm.all);
  }
  console.log(vm.all);


}
