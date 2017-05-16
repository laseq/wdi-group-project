angular
  .module('runchApp')
  .controller('GroupsIndexCtrl', GroupsIndexCtrl);

GroupsIndexCtrl.$inject = ['Group', 'TokenService', 'User', 'CurrentUserService'];
function GroupsIndexCtrl(Group, TokenService, User, CurrentUserService) {
  const vm = this;
  const weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  vm.currentUserId = TokenService.decodeToken().id;
  // vm.join = JoinGroupService.joinGroup;
  vm.join = joinGroup;
  vm.member = false;

  // groupsIndex();
  //
  // function groupsIndex() {
  //   vm.all = Group.query();
  // }

  getGroupDetails();

  function getGroupDetails() {
    return Group
      .query()
      .$promise
      .then(groups => {
        vm.all = groups;
        splitDateTimeString(groups);
      })
      .catch(err => console.log('error in getGroupDetails:', err));
  }

  // function checkIfMember() {
  //   vm.member = !!(vm.group.members.find(member => {
  //     return member._id === CurrentUserService.currentUser._id;
  //   }));
  // }

  function joinGroup(group, $event) {
    Group
      .join({ id: group._id })
      .$promise
      .then(response => {
        console.log('$event:', $event);
        console.log('$event.target:', $event.target);
        $event.target.style.display = 'none';
        // Hide the button
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
