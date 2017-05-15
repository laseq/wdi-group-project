angular
  .module('runchApp')
  .controller('GroupsShowCtrl', GroupsShowCtrl);

GroupsShowCtrl.$inject = ['Group', '$stateParams', 'TokenService', '$state'];
function GroupsShowCtrl(Group, $stateParams, TokenService, $state) {
  const vm = this;

  vm.group = Group.get($stateParams);
  vm.currentUserId = TokenService.decodeToken().id;

  vm.delete = groupsDelete;

  function groupsDelete(group) {
    Group
      .remove( { id: group._id })
      .$promise
      .then(() => {
        $state.go('groupsIndex');
      });
  }


  vm.displayEdit = function() {
    if (vm.group.admin === vm.currentUserId) {
      console.log('entered true');
      return true;
    } else {
      console.log('entered false');
      return false;
    }
  };

}
