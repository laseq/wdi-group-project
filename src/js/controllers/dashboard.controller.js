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
      // for each to check if the current user id matches one of a groups members, if so, push the group to usersGroup array
      console.log(vm.user);
      for (var i = 0; i < groups.length; i++) {
        console.log(groups);
      }
        // for (var j = 0; j < groups[i].length; j++) {
        //   console.log();
        // }

        // for (var j = 0; j < groups.length; j++) {
        //   if (groups.includes(vm.user))
        //     console.log('yes');
        //     // then push the group's name to the userGroups array
        // }

        // for(var i = 0; i < parentArray.length; i++){
        //   for(var j = 0; j < parentArray[i].length; j++){
        //
        //     console.log(parentArray[i][j]);
        //   }
        // }
      

      // console.log(groups);
    });
  }
}
