angular
  .module('runchApp')
  .controller('GroupsIndexCtrl', GroupsIndexCtrl);

GroupsIndexCtrl.$inject = ['Group', 'TokenService', 'User', 'CurrentUserService'];
function GroupsIndexCtrl(Group, TokenService, User, CurrentUserService) {
  const vm = this;
  vm.currentUserId = TokenService.decodeToken().id;
  // vm.join = JoinGroupService.joinGroup;
  vm.join = joinGroup;
  vm.member = false;

  groupsIndex();

  function groupsIndex() {
    vm.all = Group.query();
  }

  // getGroupDetails();

  // function getGroupDetails() {
  //   return Group
  //     .query()
  //     .$promise
  //     .then(groups => {
  //       vm.all = groups;
  //       //checkIfMember();
  //     })
  //     .catch(err => console.log('error in getGroupDetails:', err));
  // }

  // function checkIfMember() {
  //   vm.member = !!(vm.group.members.find(member => {
  //     return member._id === CurrentUserService.currentUser._id;
  //   }));
  // }

  function joinGroup(group, $event) {
    Group
      .join({ id: group._id })
      .$promise
      .then(response => {
        console.log('$event:', $event);
        console.log('$event.target:', $event.target);
        $event.target.hide();
        // Hide the button
      })
      .catch(err => {
        console.log(err);
      });

  }


}
