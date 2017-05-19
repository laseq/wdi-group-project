/*globals moment*/

angular
  .module('runchApp')
  .controller('GroupsNewCtrl', GroupsNewCtrl);

GroupsNewCtrl.$inject = ['$state', 'Group', 'CurrentUserService', 'TokenService', 'User'];
function GroupsNewCtrl($state, Group, CurrentUserService, TokenService, User) {
  const vm = this;

  vm.create = groupsCreate;
  vm.currentUser = User.get({ id: TokenService.decodeToken().id });

  // We're using angular moment-picker here and setting the minimum and maximum selectable times
  vm.minDateMoment = moment().add(5, 'minute');
  vm.maxDateMoment = moment().add(6, 'day');

  function groupsCreate() {
    vm.group.admin = vm.currentUser._id; // On the backend with req.user
    vm.group.members = vm.currentUser._id; // On the backend with req.user
    Group
      .save(vm.group)
      .$promise
      .then(() => {
        addGroupToUserDatabase();
      })
      .catch(err => console.log('groupsCreate error:', err));
  }

  function addGroupToUserDatabase() {
    vm.currentUser.groups.push(vm.group);
    User
      .update({ id: vm.currentUser._id }, vm.currentUser)
      .$promise
      .then(() => {
        $state.go('groupsIndex');
      });
  }

}
