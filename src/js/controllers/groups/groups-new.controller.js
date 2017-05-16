angular
  .module('runchApp')
  .controller('GroupsNewCtrl', GroupsNewCtrl);

GroupsNewCtrl.$inject = ['$state', 'Group', 'CurrentUserService', 'TokenService', 'User'];
function GroupsNewCtrl($state, Group, CurrentUserService, TokenService, User) {
  const vm = this;

  vm.create = groupsCreate;
  vm.currentUserId = TokenService.decodeToken().id;
  console.log('vm.currentUserId:', vm.currentUserId);

  getLoggedInUser();

  function groupsCreate() {
    vm.group.admin = vm.currentUserId;
    vm.group.members = vm.currentUserId;
    Group
      .save(vm.group)
      .$promise
      .then(() => {
        addGroupToUserDatabase();
      })
      .catch(err => console.log('groupsCreate error:', err));
  }

  function addGroupToUserDatabase() {
    vm.loggedInUser.groups.push(vm.group);
    User
      .update({ id: vm.currentUserId }, vm.loggedInUser)
      .$promise
      .then(() => {
        $state.go('groupsIndex');
      });
  }

  function getLoggedInUser() {
    User
      .get({ id: vm.currentUserId })
      .$promise
      .then(user => {
        vm.loggedInUser = user;
        console.log('vm.loggedInUser:', vm.loggedInUser);
      })
      .catch(err => console.log('error in getCommenters:', err));
  }
}
