angular
  .module('runchApp')
  .controller('GroupsShowCtrl', GroupsShowCtrl);

GroupsShowCtrl.$inject = ['Group', '$stateParams'];
function GroupsShowCtrl(Group, $stateParams) {
  const vm = this;

  vm.group = Group.get($stateParams);
}
