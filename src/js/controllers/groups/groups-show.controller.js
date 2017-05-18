angular
  .module('runchApp')
  .controller('GroupsShowCtrl', GroupsShowCtrl);

GroupsShowCtrl.$inject = ['Group', '$stateParams', 'TokenService', '$state', 'User', '$uibModal'];
function GroupsShowCtrl(Group, $stateParams, TokenService, $state, User, $uibModal) {
  const vm = this;

  // vm.group = Group.get($stateParams);
  //vm.currentUserId = TokenService.decodeToken().id;
  vm.currentUser = User.get({ id: TokenService.decodeToken().id });

  vm.join = joinGroup;
  vm.memberArray = [];
  vm.commenters = [];
  vm.postComment = postComment;
  vm.member = false;
  vm.memberAndNotAdmin = false;
  vm.openJoin = openJoinModal;
  vm.openLeave = openLeaveModal;
  vm.openDelete = openDeleteModal;

  const weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  getGroupDetails();

  function checkIfMember() {
    vm.member = !!(vm.group.members.find(member => {
      return member._id === vm.currentUser._id;
    }));
  }

  function checkIfMemberAndNotAdmin() {
    vm.memberAndNotAdmin = !!(vm.group.members.find(member => {
      return (member._id === vm.currentUser._id && vm.group.admin._id !== vm.currentUser._id);
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
        checkIfMemberAndNotAdmin();
      })
      .catch(err => console.log('error in getGroupDetails:', err));
  }

  function joinGroup($event) {
    Group
      .join({ id: $stateParams.id })
      .$promise
      .then(group => {
        console.log('group:', group);
        vm.group = group;
        splitDateTimeString(vm.group);
        checkIfMember();
        checkIfMemberAndNotAdmin();
        openJoinModal($event);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function openJoinModal($event) {

    $uibModal.open({
      templateUrl: 'js/views/partials/groupJoinModal.html',
      controller: 'GroupsJoinCtrl as groupsJoin',
      resolve: {
        group: () => {
          return vm.group;
        },
        theEvent: () => {
          return $event;
        }
      }
    });
  }

  function openLeaveModal($event) {

    var leaveModalInstance = $uibModal.open({
      templateUrl: 'js/views/partials/groupLeaveModal.html',
      controller: 'GroupsLeaveCtrl as groupsLeave',
      resolve: {
        group: () => {
          return vm.group;
        },
        theEvent: () => {
          return $event;
        },
        theIndex: () => {
          return null;
        },
        currentUserId: () => {
          return vm.currentUser._id;
        }
      }
    });

    leaveModalInstance
      .result
      .then(passedItem => {
        if (passedItem) {
          vm.group = passedItem;
          splitDateTimeString(vm.group);
          checkIfMember();
          checkIfMemberAndNotAdmin();
        }
      });
  }

  function openDeleteModal() {
    $uibModal.open({
      templateUrl: 'js/views/partials/groupDeleteModal.html',
      controller: 'GroupsDeleteCtrl as groupsDelete',
      resolve: {
        group: () => {
          return vm.group;
        }
      }
    });
  }

  function splitDateTimeString(group) {
    group.schedule.forEach(schedule => {
      const timeInfo = new Date(schedule.date);
      schedule.day = weekDay[timeInfo.getDay()];
      const theDate = timeInfo.getDate();
      const theMonth = months[timeInfo.getMonth()];
      const theYear = timeInfo.getUTCFullYear();
      let startHours = timeInfo.getHours();
      let startMins = timeInfo.getMinutes();
      if (startHours < 10) {
        startHours = `0${startHours}`;
      }
      if (startMins < 10) {
        startMins = `0${startMins}`;
      }
      schedule.viewableDate = `${schedule.day}, ${theDate} ${theMonth} ${theYear}`;
      schedule.startTime = `${startHours}:${startMins}`;
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
        vm.commentObject.comment = '';
      })
      .catch(err => console.log('error in postComment:', err));
  }

}
