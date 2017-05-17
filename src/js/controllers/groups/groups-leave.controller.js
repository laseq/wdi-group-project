angular
  .module('runchApp')
  .controller('GroupsLeaveCtrl', GroupsLeaveCtrl);

GroupsLeaveCtrl.$inject = ['group', 'theEvent', 'theIndex', '$uibModalInstance', '$state'];
function GroupsLeaveCtrl(group, theEvent, theIndex, $uibModalInstance, $state) {

  console.log('Entered GroupsLeaveCtrl');

  const vm = this;
  vm.group = group;
  vm.theEvent = theEvent;
  vm.theIndex = theIndex;

  console.log('vm.group in GroupsLeaveCtrl:', vm.group);
  console.log('vm.theEvent in GroupsLeaveCtrl:', vm.theEvent);
  console.log('vm.theIndex in GroupsLeaveCtrl:', vm.theIndex);

  function closeModal() {
    console.log('Entered closeModal in GroupsLeaveCtrl');
    $uibModalInstance.close();
  }

  vm.close = closeModal;

  function groupsLeave() {
    console.log('Entered groupsLeave in GroupsLeaveCtrl');
    // vm.animal
    //   .$remove()
    //   .then(() => {
    //     $state.go('animalsIndex');
    //     $uibModalInstance.close();
    //   });
  }

  vm.leave = groupsLeave;

}
