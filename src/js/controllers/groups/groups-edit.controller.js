/*globals moment*/

angular
  .module('runchApp')
  .controller('GroupsEditCtrl', GroupsEditCtrl);

GroupsEditCtrl.$inject = ['$stateParams', '$state', 'Group'];
function GroupsEditCtrl($stateParams, $state, Group) {
  const vm = this;

  // vm.group = Group.get($stateParams);
  vm.update = groupsUpdate;
  // We're using angular moment-picker here and setting the minimum and maximum selectable times
  vm.minDateMoment = moment().add(5, 'minute');
  vm.maxDateMoment = moment().add(6, 'day');

  getGroupDetails();

  function getGroupDetails() {
    Group
      .get($stateParams)
      .$promise
      .then(group => {
        vm.group = group;
        vm.momentDate = moment(vm.group.schedule[0].date);
      })
      .catch(err => console.log(err));
  }

  function groupsUpdate() {
    Group
      .update({ id: $stateParams.id }, vm.group)
      .$promise
      .then(() => {
        $state.go('groupsShow', { id: vm.group._id });
      });
  }

}
