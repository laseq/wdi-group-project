angular
  .module('runchApp')
  .controller('GroupsShowCtrl', GroupsShowCtrl);

GroupsShowCtrl.$inject = ['Group', '$stateParams', 'TokenService', '$state', 'User', 'CurrentUserService'];
function GroupsShowCtrl(Group, $stateParams, TokenService, $state, User, CurrentUserService) {
  const vm = this;

  // vm.group = Group.get($stateParams);
  //vm.currentUserId = TokenService.decodeToken().id;
  // vm.currentUser = CurrentUserService.currentUser;
  vm.currentUser = User.get({ id: TokenService.decodeToken().id });

  vm.delete = groupsDelete;
  vm.join = joinGroup;
  vm.leave = leaveGroup;
  vm.memberArray = [];
  vm.commenters = [];
  vm.postComment = postComment;
  vm.member = false;
  const weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  getGroupDetails();

  function checkIfMember() {
    vm.member = !!(vm.group.members.find(member => {
      //return member._id === CurrentUserService.currentUser._id;
      return member._id === vm.currentUser._id;
    }));
  }

  function getGroupDetails() {
    return Group
      .get($stateParams)
      .$promise
      .then(group => {
        vm.group = group;
        splitDateTimeString(group);
        checkIfMember();
        // console.log('group.admin:', group.admin);
      })
      .catch(err => console.log('error in getGroupDetails:', err));
  }

  function splitDateTimeString(group) {
    group.schedule.forEach(schedule => {
      const timeInfo = new Date(schedule.date);
      schedule.day = weekDay[timeInfo.getDay()];
      const theDate = timeInfo.getDate();
      const theMonth = months[timeInfo.getMonth()];
      const theYear = timeInfo.getUTCFullYear();
      let startHours = timeInfo.getUTCHours();
      let startMins = timeInfo.getUTCMinutes();
      if (startHours < 10) {
        startHours = `0${startHours}`;
      }
      if (startMins < 10) {
        startMins = `0${startMins}`;
      }
      schedule.viewableDate = `${theDate} ${theMonth} ${theYear}`;
      schedule.startTime = `${startHours}:${startMins}`;
    });
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
      .then(group => {
        vm.group = group;
        splitDateTimeString(vm.group);
        checkIfMember();
      })
      .catch(err => {
        console.log(err);
      });
  }

  function leaveGroup() {
    if (vm.currentUser._id === vm.group.admin._id) {
      console.log('You can\'t leave the group as you\'re the admin');
      return false;
    }
    Group
    .leave({ id: $stateParams.id })
    .$promise
    .then(group => {
      console.log('group in leaveGroup:', group);
      const position = group.members.indexOf(vm.currentUser._id);
      group.members.splice(position);
      vm.group = group;
      splitDateTimeString(vm.group);
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
