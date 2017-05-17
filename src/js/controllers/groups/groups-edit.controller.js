/*globals moment*/

angular
  .module('runchApp')
  .controller('GroupsEditCtrl', GroupsEditCtrl);

GroupsEditCtrl.$inject = ['$stateParams', '$state', 'Group'];
function GroupsEditCtrl($stateParams, $state, Group) {
  const vm = this;

  vm.group = Group.get($stateParams);
  vm.update = groupsUpdate;
  console.log('vm.group:', vm.group);



  // We're using angular moment-picker here and setting the minimum and maximum selectable times
  vm.minDateMoment = moment().add(5, 'minute');
  vm.maxDateMoment = moment().add(6, 'day');

  function groupsUpdate() {
    Group
      .update({ id: $stateParams.id }, vm.group)
      .$promise
      .then(() => {
        $state.go('groupsIndex');
      });
  }


  const weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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
