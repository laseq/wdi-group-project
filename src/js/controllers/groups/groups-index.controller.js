angular
  .module('runchApp')
  .controller('GroupsIndexCtrl', GroupsIndexCtrl);

GroupsIndexCtrl.$inject = ['Group', 'TokenService', 'User', 'JoinGroupService'];
function GroupsIndexCtrl(Group, TokenService, User, JoinGroupService) {
  const vm = this;
  vm.currentUserId = TokenService.decodeToken().id;
  vm.join = JoinGroupService.joinGroup;

  groupsIndex();

  function groupsIndex() {
    vm.all = Group.query();
  }
}
