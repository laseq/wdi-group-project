angular
  .module('runchApp')
  .controller('GroupsEditCtrl', GroupsEditCtrl);

GroupsEditCtrl.$inject = ['$stateParams', '$state', 'Group'];
function GroupsEditCtrl($stateParams, $state, Group) {
  const vm = this;

  vm.group = Group.get($stateParams);
  vm.update = groupsUpdate;
  console.log('vm.group:', vm.group);
  // console.log('vm.group.schedule.date:', vm.group.schedule[0].date);

  function groupsUpdate() {
    Group
      .update({ id: $stateParams.id }, vm.group)
      .$promise
      .then(() => {
        $state.go('groupsIndex');
      });
  }
}
