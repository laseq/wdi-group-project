angular
.module('runchApp')
.controller('DashboardCtrl', DashboardCtrl);

// show the user's groups by gettig the current users id, and seeing if it matches any of those in a group's members array?
DashboardCtrl.$inject = ['Group', '$stateParams', '$state', 'CurrentUserService'];

function DashboardCtrl(Group, $stateParams, $state, CurrentUserService) {
  const vm = this;
  vm.loggedInUser = CurrentUserService.currentUser;

  // console.log('vm.loggedInUser:', vm.loggedInUser);
}
