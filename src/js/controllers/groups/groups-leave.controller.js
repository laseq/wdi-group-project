angular
  .module('runchApp')
  .controller('GroupsLeaveCtrl', GroupsLeaveCtrl);

GroupsLeaveCtrl.$inject = ['group', 'theEvent', 'theIndex', 'currentUserId', '$uibModalInstance', '$state', 'Group'];
function GroupsLeaveCtrl(group, theEvent, theIndex, currentUserId, $uibModalInstance, $state, Group) {

  const vm = this;
  vm.group = group;
  vm.theEvent = theEvent;
  vm.theIndex = theIndex;
  vm.currentUserId = currentUserId;
  vm.close = closeModal;
  vm.leave = groupsLeave;

  function closeModal() {
    $uibModalInstance.close();
  }

  function groupsLeave() {
    if (vm.currentUserId === vm.group.admin._id) {
      return false;
    }
    Group
      .leave({ id: group._id })
      .$promise
      .then(group => {

        vm.theEvent.target.style.display = 'none';

        // Since the /api/groups/:id/leave call populates the members,
        // as member population is required for the groups show leaving,
        // this loop replaces the population with just the member id
        // to get the show and hide functionality of the join/leave buttons working
        if (vm.theIndex !== null) {
          for (let i=0; i<group.members.length; i++) {
            group.members[i] = group.members[i]._id;
          }

          // Take the member out of the group. Trust me, Mongo DB has some sort of time lag
          // with removing an element and so the update isn't
          // instantaneous like with adding to the database
          const position = group.members.indexOf(vm.currentUserId);
          if (position !== -1) group.members.splice(position);
        }

        // If the leave request comes from the group show page
        // i.e group is populated with member information
        if (vm.theIndex === null) {
          for (let i=0; i<group.members.length; i++) {
            if (group.members[i]._id === vm.currentUserId) {
              group.members.splice(i);
              break;
            }
          }
        }

        $uibModalInstance.close(group);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
