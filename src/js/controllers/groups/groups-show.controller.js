angular
  .module('runchApp')
  .controller('GroupsShowCtrl', GroupsShowCtrl);

GroupsShowCtrl.$inject = ['Group', '$stateParams', 'TokenService', '$state', 'User', 'CurrentUserService'];
function GroupsShowCtrl(Group, $stateParams, TokenService, $state, User, CurrentUserService) {
  const vm = this;

  vm.currentUser = User.get({ id: TokenService.decodeToken().id });
  vm.delete = groupsDelete;
  vm.join = joinGroup;
  vm.memberArray = [];
  vm.commenters = [];
  vm.postComment = postComment;
  vm.member = false;

  getGroupDetails();

  function checkIfMember() {
    vm.member = !!(vm.group.members.find(member => {
      return member._id === CurrentUserService.currentUser._id;
    }));
  }

  function getGroupDetails() {
    return Group
      .get($stateParams)
      .$promise
      .then(group => {
        vm.group = group;
        checkIfMember();
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

  function joinGroup() {
    Group
      .join({ id: $stateParams.id })
      .$promise
      .then(response => {
        checkIfMember();
      })
      .catch(err => {
        console.log(err);
      });
  }

  function postComment() {
    vm.group.comments.push({
      comment: vm.commentObject.comment,
      user: vm.currentUser
    });

    Group
      .update({ id: vm.group._id }, vm.group)
      .$promise
      .then(() => {
        console.log('Comment posted');
        //getCommenters();
      })
      .catch(err => console.log('error in postComment:', err));
  }

}
