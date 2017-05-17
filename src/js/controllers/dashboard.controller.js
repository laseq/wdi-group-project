angular
.module('runchApp')
.controller('DashboardCtrl', DashboardCtrl);

DashboardCtrl.$inject = ['Group', 'TokenService', 'User'];

function DashboardCtrl(Group, TokenService, User) {
  const vm = this;
  // vm.all = Group.query();
  vm.user = User.get({ id: TokenService.decodeToken().id });

  const weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  vm.now = new Date();
  vm.upcoming = getUpcomingRuns;

  getGroupDetails();

  function getGroupDetails() {
    return Group
      .query()
      .$promise
      .then(groups => {
        vm.all = groups;
        splitDateTimeString(groups);
        getUpcomingRuns();
      })
      .catch(err => console.log('error in getGroupDetails:', err));
  }

  function getUpcomingRuns() {
    vm.upcomingArray = [];
    vm.all.forEach(group => {
      if (new Date(group.schedule[0].date) > vm.now) {
        console.log('group.schedule[0].date:', group.schedule[0].date);
        console.log('vm.now:', vm.now);
        vm.upcomingArray.push(group);
        vm.orderBy = 'schedule[0].date';
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
        let startHours = timeInfo.getUTCHours();
        let startMins = timeInfo.getUTCMinutes();
        if (startHours < 10) {
          startHours = `0${startHours}`;
        }
        if (startMins < 10) {
          startMins = `0${startMins}`;
        }
        schedule.viewableDate = `${schedule.day} ${theDate} ${theMonth} ${theYear}`;
        schedule.startTime = `${startHours}:${startMins}`;
      });
    });
  }

}
