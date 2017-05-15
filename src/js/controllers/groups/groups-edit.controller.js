angular
  .module('runchApp')
  .controller('GroupsEditCtrl', GroupsEditCtrl);

GroupsEditCtrl.$inject = ['$stateParams', '$state', 'Group'];
function GroupsEditCtrl($stateParams, $state, Group) {
  const vm = this;

  vm.group = Group.get($stateParams);
  vm.update = groupsUpdate;

  function groupsUpdate() {
    Group
      .update({ id: $stateParams.id }, vm.group)
      .$promise
      .then(() => {
        $state.go('groupsIndex');
      });
  }
}
