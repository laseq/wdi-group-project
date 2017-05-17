angular
  .module('runchApp')
  .controller('GroupsIndexCtrl', GroupsIndexCtrl);

GroupsIndexCtrl.$inject = ['Group', 'TokenService', 'User', 'filterFilter'];
function GroupsIndexCtrl(Group, TokenService, User, filterFilter) {
  const vm = this;
  const weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  vm.currentUserId = TokenService.decodeToken().id;
  vm.join = joinGroup;
  vm.leave = leaveGroup;
  vm.member = false;
  // vm.filterTime = filterTimeSpans;
  // vm.now = new Date();
  // vm.radioFilter = 'Upcoming';

  //vm.all = Group.query();

  // function filterTimeSpans() {
  //   console.log('vm.radioFilter:', vm.radioFilter);
  //   vm.filterArray = [];
  //
  //   if (vm.radioFilter === 'Upcoming') {
  //     vm.all.forEach(group => {
  //       if (new Date(group.schedule[0].date) > vm.now) {
  //         vm.filterArray.push(group);
  //         vm.orderBy = 'schedule[0].date';
  //       }
  //     });
  //   } else if (vm.radioFilter === 'Past') {
  //     vm.all.forEach(group => {
  //       if (new Date(group.schedule[0].date) <= vm.now) {
  //         vm.filterArray.push(group);
  //         vm.orderBy = '-schedule[0].date';
  //       }
  //     });
  //   } else {
  //     vm.all.forEach(group => {
  //       vm.filterArray.push(group);
  //       vm.orderBy = '-schedule[0].date';
  //     });
  //   }
  // }

  getGroupDetails();

  function getGroupDetails() {
    return Group
      .query()
      .$promise
      .then(groups => {
        vm.all = groups;
        splitDateTimeString(groups);
        // filterTimeSpans();
      })
      .catch(err => console.log('error in getGroupDetails:', err));
  }

  function joinGroup(group, $event, $index) {
    Group
      .join({ id: group._id })
      .$promise
      .then(group => {
        $event.target.style.display = 'none';
        vm.all[$index] = group;
        splitDateTimeString(vm.all);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function leaveGroup(group, $event, $index) {
    if (vm.currentUserId === group.admin._id) {
      return false;
    }
    Group
      .leave({ id: group._id })
      .$promise
      .then(group => {
        $event.target.style.display = 'none';
        const position = group.members.indexOf(vm.currentUserId);
        group.members.splice(position);
        vm.all[$index] = group;
        splitDateTimeString(vm.all);
      })
      .catch(err => {
        console.log(err);
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
    });
  }
}
