angular
  .module('runchApp')
  .controller('GroupsIndexCtrl', GroupsIndexCtrl);

GroupsIndexCtrl.$inject = ['Group', 'TokenService'];
function GroupsIndexCtrl(Group, TokenService) {
  const vm = this;
  vm.currentUserId = TokenService.decodeToken().id;

  groupsIndex();

  function groupsIndex() {
    vm.all = Group.query();
  }

  vm.joinGroup = function() {
    
  };


}
