angular
  .module('runchApp')
  .controller('GroupsNewCtrl', GroupsNewCtrl);

GroupsNewCtrl.$inject = ['$state', 'Group', 'CurrentUserService', 'TokenService'];
function GroupsNewCtrl($state, Group, CurrentUserService, TokenService) {
  const vm = this;

  vm.create = groupsCreate;
  vm.currentUserId = TokenService.decodeToken().id;
  console.log('vm.currentUserId:', vm.currentUserId);

  function groupsCreate() {
    vm.group.admin = vm.currentUserId;
    Group
      .save(vm.group)
      .$promise
      .then(() => {
        $state.go('groupsIndex');
      })
      .catch(err => console.log('groupsCreate error:', err));
  }
}
