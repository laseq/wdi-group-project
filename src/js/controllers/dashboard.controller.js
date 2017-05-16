angular
.module('runchApp')
.controller('DashboardCtrl', DashboardCtrl);

DashboardCtrl.$inject = ['Group', '$stateParams', '$state', 'CurrentUserService'];

function DashboardCtrl(Group, $stateParams, $state, CurrentUserService) {
  const vm = this;
  vm.loggedInUser = CurrentUserService.currentUser;
  vm.ownedGroups  = [];

  // groupsIndex();
  getGroupsAndFindYourGroups();


  // function groupsIndex() {
  //   vm.all = Group.query();
  // }

  function getGroupsAndFindYourGroups() {
    Group
    .query()
    .$promise
    .then(groups => {
      vm.all = groups;
      console.log('vm.all:', vm.all);
      groups.forEach(group => {
        console.log('group:', group);
        console.log('vm.loggedInUser._id:', vm.loggedInUser._id);
        console.log('group.admin.id:', group.admin.id);
        if(vm.loggedInUser._id === group.admin.id){
          console.log(`${vm.loggedInUser.username} is the admin of ${group.name}`);
          vm.ownedGroups.push(group);
        }
      });
    })
    .catch(err => console.log(err));
  }

  function createdGroup() {
    console.log(vm.all);

    vm.all.forEach(group => {
      console.log('group:', group);
    });
  }
}
