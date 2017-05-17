angular
  .module('runchApp')
  .controller('GroupsLeaveCtrl', GroupsLeaveCtrl);

GroupsLeaveCtrl.$inject = ['group', 'theEvent', 'theIndex', 'currentUserId', '$uibModalInstance', '$state', 'Group'];
function GroupsLeaveCtrl(group, theEvent, theIndex, currentUserId, $uibModalInstance, $state, Group) {

  console.log('Entered GroupsLeaveCtrl');

  const vm = this;
  vm.group = group;
  vm.theEvent = theEvent;
  vm.theIndex = theIndex;
  vm.currentUserId = currentUserId;
  vm.close = closeModal;
  vm.leave = groupsLeave;

  // console.log('vm.group in GroupsLeaveCtrl:', vm.group);
  // console.log('vm.theEvent in GroupsLeaveCtrl:', vm.theEvent);
  // console.log('vm.theIndex in GroupsLeaveCtrl:', vm.theIndex);
  // console.log('vm.currentUserId in GroupsLeaveCtrl:', vm.currentUserId);

  function closeModal() {
    console.log('Entered closeModal in GroupsLeaveCtrl');
    $uibModalInstance.close();
  }

  function groupsLeave() {
    if (vm.currentUserId === vm.group.admin._id) {
      console.log('You are the admin. You cannot leave your own group');
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

          console.log('group.members:', group.members);

          const position = group.members.indexOf(vm.currentUserId);
          console.log('position:', position);

          if (position !== -1) {
            group.members.splice(position);
          }
        }

        // If the leave request comes from the group show page
        // i.e group is populated with member information
        if (vm.theIndex === null) {
          console.log('Entered vm.theIndex === null if statement');
          for (let i=0; i<group.members.length; i++) {
            console.log('group.members[i]._id:', group.members[i]._id);
            console.log('vm.currentUserId:', vm.currentUserId);
            if (group.members[i]._id === vm.currentUserId) {
              console.log('Entered group.members[i]._id === vm.currentUserId if statement');
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
