angular
  .module('runchApp')
  .controller('GroupsIndexCtrl', GroupsIndexCtrl);

GroupsIndexCtrl.$inject = ['Group', 'TokenService', 'User'];
function GroupsIndexCtrl(Group, TokenService, User) {
  const vm = this;
  const weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  vm.currentUserId = TokenService.decodeToken().id;
  vm.join = joinGroup;
  vm.leave = leaveGroup;
  vm.member = false;

  //vm.all = Group.query();

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

  function joinGroup(group, $event) {
    Group
      .join({ id: group._id })
      .$promise
      .then(group => {
        console.log('group after joining:', group);
        $event.target.style.display = 'none';
      })
      .catch(err => {
        console.log(err);
      });
  }

  function leaveGroup(group, $event) {

    Group
      .leave({ id: group._id })
      .$promise
      .then(group => {
        console.log('group after leaving:', group);
        $event.target.style.display = 'none';
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
