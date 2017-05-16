angular
  .module('runchApp')
  .controller('GroupsIndexCtrl', GroupsIndexCtrl);

GroupsIndexCtrl.$inject = ['Group', 'TokenService', 'User'];
function GroupsIndexCtrl(Group, TokenService, User) {
  const vm = this;
  vm.currentUserId = TokenService.decodeToken().id;
  vm.join = joinGroup;
  vm.member = false;

  vm.all = Group.query();

  function joinGroup(group, $event) {
    Group
      .join({ id: group._id })
      .$promise
      .then(() => {
        $event.target.style.display = 'none';
      })
      .catch(err => {
        console.log(err);
      });
  }
}
