angular
  .module('runchApp')
  .controller('GroupsShowCtrl', GroupsShowCtrl);

GroupsShowCtrl.$inject = ['Group', '$stateParams', 'TokenService', '$state', 'User'];
function GroupsShowCtrl(Group, $stateParams, TokenService, $state, User) {
  const vm = this;

  // vm.group = Group.get($stateParams);
  vm.currentUserId = TokenService.decodeToken().id;
  vm.delete = groupsDelete;
  vm.memberArray = [];
  vm.commenters = [];

  getGroupDetails();

  function getGroupDetails() {
    return Group
      .get($stateParams)
      .$promise
      .then(group => {
        vm.group = group;
        getAdminDetails();
        getMemberDetails();
        getCommenters();
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

  function getMemberDetails() {
    vm.group.members.forEach(member => {
      User
        .get({ id: member })
        .$promise
        .then(theMember => {
          vm.memberArray.push(theMember);
        })
        .catch(err => console.log('error in getMemberDetails:', err));
    });
  }

  function getCommenters() {
    // vm.group.comments.forEach(comment => {
    //   User
    //     .get({ id: comment.user })
    //     .$promise
    //     .then(commenter => {
    //       vm.commenters.push(commenter);
    //     })
    //     .catch(err => console.log('error in getCommenters:', err));
    // });

    for (let i=0; i<vm.group.comments.length; i++) {
      User
        .get({ id: vm.group.comments[i].user })
        .$promise
        .then(commenter => {
          vm.group.comments[i].userDetails = commenter;
        })
        .catch(err => console.log('error in getCommenters:', err));
    }


  }

}
