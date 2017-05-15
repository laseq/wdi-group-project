angular
  .module('runchApp')
  .controller('GroupsIndexCtrl', GroupsIndexCtrl);

GroupsIndexCtrl.$inject = ['Group', 'TokenService', 'User', 'JoinGroupService', 'CurrentUserService'];
function GroupsIndexCtrl(Group, TokenService, User, JoinGroupService, CurrentUserService) {
  const vm = this;
  vm.currentUserId = TokenService.decodeToken().id;
  vm.join = JoinGroupService.joinGroup;
  // vm.loggedInUser = CurrentUserService.retrieveUser();

  groupsIndex();

  function groupsIndex() {
    vm.all = Group.query();
  }





}
