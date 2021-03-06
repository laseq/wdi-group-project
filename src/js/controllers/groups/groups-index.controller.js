angular
  .module('runchApp')
  .controller('GroupsIndexCtrl', GroupsIndexCtrl);

GroupsIndexCtrl.$inject = ['Group', 'TokenService', 'User', '$uibModal'];
function GroupsIndexCtrl(Group, TokenService, User, $uibModal) {
  const vm = this;

  const weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  vm.currentUserId = TokenService.decodeToken().id;
  vm.join = joinGroup;
  vm.member = false;
  vm.groupAdmin = false;
  vm.openLeave = openLeaveModal;

  getGroupDetails();

  function getGroupDetails() {
    return Group
      .query()
      .$promise
      .then(groups => {
        vm.all = groups;
        splitDateTimeString(groups);

        for (let i=0; i<groups.length; i++) {
          if (groups[i].admin._id === vm.currentUserId) {
            vm.groupAdmin = true;
            break;
          }
        }
      })
      .catch(err => console.log('error in getGroupDetails:', err));
  }

  function joinGroup(group, $event, $index) {

    if (vm.all[$index].members.length >= vm.all[$index].schedule[0].maxRunners) {
      openMaxRunnersModal(group);
      return;
    }

    Group
      .join({ id: group._id })
      .$promise
      .then(group => {
        $event.target.style.display = 'none';
        vm.all[$index] = group;

        // Since the /api/groups/:id/join call populates the members,
        // as member population is required for the groups show joining,
        // this loop replaces the population with just the member id
        // to get the show and hide functionality of the join/leave buttons working
        for (let i=0; i<vm.all[$index].members.length; i++) {
          vm.all[$index].members[i] = group.members[i]._id;
        }
        splitDateTimeString(vm.all);
        openJoinModal(group, $event);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function openMaxRunnersModal(group) {
    $uibModal.open({
      templateUrl: 'js/views/partials/maxRunnersModal.html',
      controller: 'MaxRunnersCtrl as maxRunnersCtrl',
      resolve: {
        group: () => {
          return group;
        }
      }
    });
  }

  function openJoinModal(group, $event) {

    $uibModal.open({
      templateUrl: 'js/views/partials/groupJoinModal.html',
      controller: 'GroupsJoinCtrl as groupsJoin',
      resolve: {
        group: () => {
          return group;
        },
        theEvent: () => {
          return $event;
        }
      }
    });
  }

  function openLeaveModal(group, $event, $index, currentUserId) {

    var leaveModalInstance = $uibModal.open({
      templateUrl: 'js/views/partials/groupLeaveModal.html',
      controller: 'GroupsLeaveCtrl as groupsLeave',
      resolve: {
        group: () => {
          return group;
        },
        theEvent: () => {
          return $event;
        },
        theIndex: () => {
          return $index;
        },
        currentUserId: () => {
          return currentUserId;
        }
      }
    });

    leaveModalInstance
      .result
      .then(passedItem => {
        if (passedItem) {
          vm.all[$index] = passedItem;
          splitDateTimeString(vm.all);
        }
      });
  }

  function splitDateTimeString(groups) {
    groups.forEach(group => {
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
        schedule.viewableDate = `${theDate} ${theMonth} ${theYear}`;
        schedule.startTime = `${startHours}:${startMins}`;
      });
    });
  }

}
