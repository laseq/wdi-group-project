angular
  .module('runchApp')
  .controller('GroupsShowCtrl', GroupsShowCtrl);

GroupsShowCtrl.$inject = ['Group', '$stateParams', 'TokenService', '$state', 'User'];
function GroupsShowCtrl(Group, $stateParams, TokenService, $state, User) {
  const vm = this;

  // vm.group = Group.get($stateParams);
  vm.currentUserId = TokenService.decodeToken().id;
  vm.delete = groupsDelete;
  getGroupDetails();

  function getGroupDetails() {
    return Group
      .get($stateParams)
      .$promise
      .then(group => {
        vm.group = group;
        getAdminDetails();
      })
      .catch(err => console.log('error in getGroupDetails:', err));
  }

  function groupsDelete(group) {
    Group
      .remove({ id: group._id })
      .$promise
      .then(() => {
        $state.go('groupsIndex');
      });
  }

  function getAdminDetails() {
    User
      .get({ id: vm.group.admin })
      .$promise
      .then(admin => {
        vm.admin = admin;
      });
  }

}
