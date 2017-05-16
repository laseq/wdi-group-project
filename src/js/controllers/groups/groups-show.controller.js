angular
  .module('runchApp')
  .controller('GroupsShowCtrl', GroupsShowCtrl);

GroupsShowCtrl.$inject = ['Group', '$stateParams', 'TokenService', '$state', 'User', 'CurrentUserService'];
function GroupsShowCtrl(Group, $stateParams, TokenService, $state, User, CurrentUserService) {
  const vm = this;

  // vm.group = Group.get($stateParams);
  vm.currentUserId = TokenService.decodeToken().id;
  vm.currentUser = CurrentUserService.currentUser;
  vm.delete = groupsDelete;
  vm.join = joinGroup;
  vm.memberArray = [];
  vm.commenters = [];
  vm.postComment = postComment;

  getGroupDetails();
  // getLoggedInUser();

  function getGroupDetails() {
    return Group
      .get($stateParams)
      .$promise
      .then(group => {
        vm.group = group;
        // getAdminDetails();
        // getMemberDetails();
        // getCommenters();
        console.log('group:', group);
        console.log('vm.currentUser:', vm.currentUser);
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

  // function getCommenters() {
  //   // vm.group.comments.forEach(comment => {
  //   //   User
  //   //     .get({ id: comment.user })
  //   //     .$promise
  //   //     .then(commenter => {
  //   //       vm.commenters.push(commenter);
  //   //     })
  //   //     .catch(err => console.log('error in getCommenters:', err));
  //   // });
  //
  //   for (let i=0; i<vm.group.comments.length; i++) {
  //     User
  //       .get({ id: vm.group.comments[i].user })
  //       .$promise
  //       .then(commenter => {
  //         vm.group.comments[i].userDetails = commenter;
  //       })
  //       .catch(err => console.log('error in getCommenters:', err));
  //   }
  // }

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

  function joinGroup() {
    for (let i=0; i<vm.group.members.length; i++) {
      if (vm.group.members[i]._id === vm.currentUser._id) {
        console.log('You\'ve already joined this group');
        return false;
      }
    }
    if (vm.group.schedule[0].maxRunners <= vm.group.members.length) {
      console.log('Maximum number of runners has been reached');
      return false;
    }
    // vm.memberArray.push(vm.loggedInUser);
    vm.group.members.push(vm.currentUser);
    vm.currentUser.groups.push(vm.group._id);
    console.log('vm.currentUser:', vm.currentUser);
    Group
      .update({ id: $stateParams.id }, vm.group)
      .$promise
      .then(() => {
        User
          .update({ id: vm.currentUser._id }, vm.currentUser)
          .$promise
          .then(() => {
            console.log('Joined group');
          });
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
