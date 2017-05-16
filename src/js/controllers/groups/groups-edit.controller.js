/*globals moment*/

angular
  .module('runchApp')
  .controller('GroupsEditCtrl', GroupsEditCtrl);

GroupsEditCtrl.$inject = ['$stateParams', '$state', 'Group'];
function GroupsEditCtrl($stateParams, $state, Group) {
  const vm = this;

  vm.group = Group.get($stateParams);
  vm.update = groupsUpdate;
  console.log('vm.group:', vm.group);

  // We're using angular moment-picker here and setting the minimum and maximum selectable times
  vm.minDateMoment = moment().add(5, 'minute');
  vm.maxDateMoment = moment().add(6, 'day');

  function groupsUpdate() {
    Group
      .update({ id: $stateParams.id }, vm.group)
      .$promise
      .then(() => {
        $state.go('groupsIndex');
      });
  }
}
