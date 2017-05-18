angular
  .module('runchApp')
  .controller('GroupsJoinCtrl', GroupsJoinCtrl);

GroupsJoinCtrl.$inject = ['group', 'theEvent', '$uibModalInstance', '$state'];
function GroupsJoinCtrl(group, theEvent, $uibModalInstance, $state) {

  const vm = this;
  vm.group = group;
  vm.theEvent = theEvent;
  vm.close = closeModal;

  const weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  splitDateTimeString(vm.group);

  function closeModal() {
    $uibModalInstance.close();
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

      vm.viewableDate = `${schedule.day} ${theDate} ${theMonth} ${theYear}`;
      schedule.startTime = `${startHours}:${startMins}`;
    });
  }

}
