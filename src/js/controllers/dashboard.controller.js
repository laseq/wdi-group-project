angular
.module('runchApp')
.controller('DashboardCtrl', DashboardCtrl);

// show the user's groups by gettig the current users id, and seeing if it matches any of those in a group's members array?
DashboardCtrl.$inject = ['Group', '$stateParams', '$state', 'CurrentUserService'];

function DashboardCtrl(Group, $stateParams, $state, CurrentUserService) {
  const vm = this;
  vm.user = CurrentUserService.currentUser.id;
  const usersGroups = [];

  memberOf();

  function memberOf() {
    const group = vm.all;
    vm.all = Group.query()
    .$promise
    .then((groups) => {
      console.log(vm.user);
      // for each to check if the current user id matches one of a groups members, if so, push the group to usersGroup array
      for (var i = 0; i < groups.length; i++) {
        var groupMembers = groups[i].members; // gets an array of each groups members
        console.log(groupMembers);
        groupMembers.forEach(member => {
          console.log(member);
          // if (member.includes(vm.user) {
          //   return console.log('Match');
          // }
        });

        //
        // .$promise
        // .then(theMember => {
        //   vm.memberArray.push(theMember);
        // })
        // .catch(err => console

        // for (var j = 0; j < groupMembers[j]; j++) {
        //   console.log(groupMembers);
      }
      // console.log(groups[0].name); // Gets the group's name
    }
  }
}
