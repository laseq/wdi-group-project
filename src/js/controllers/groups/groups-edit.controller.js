/*globals moment*/

angular
  .module('runchApp')
  .controller('GroupsEditCtrl', GroupsEditCtrl);

GroupsEditCtrl.$inject = ['$stateParams', '$state', 'Group', '$uibModal'];
function GroupsEditCtrl($stateParams, $state, Group, $uibModal) {
  const vm = this;

  // vm.group = Group.get($stateParams);
  vm.update = groupsUpdate;
  vm.openRouteEdit = openRouteEdit;
  vm.discardRouteChanges = false;
  // We're using angular moment-picker here and setting the minimum and maximum selectable times
  vm.minDateMoment = moment().add(5, 'minute');
  vm.maxDateMoment = moment().add(6, 'day');

  getGroupDetails();

  function getGroupDetails() {
    Group
      .get($stateParams)
      .$promise
      .then(group => {
        vm.group = group;
        vm.momentDate = moment(vm.group.schedule[0].date);
      })
      .catch(err => console.log(err));
  }

  function groupsUpdate() {
    Group
      .update({ id: $stateParams.id }, vm.group)
      .$promise
      .then(() => {
        $state.go('groupsShow', { id: vm.group._id });
      });
  }

  function openRouteEdit() {
    const locationInput = document.getElementById('location');
    console.log(locationInput.value.length);
    if (locationInput.value.length < 5) {
      console.log('Fill in your postcode to access the route creator');
      return;
    }
    var routeModalInstance = $uibModal.open({
      templateUrl: 'js/views/partials/groupCreateRouteModal.html',
      controller: 'CreateRouteCtrl as createRoute',
      size: 'lg',
      id: 'create-route-modal',
      resolve: {
        location: () => {
          return vm.group.schedule[0].location;
        },
        route: () => {
          return vm.group.schedule[0].route;
        },
        discard: () => {
          return vm.discardRouteChanges;
        }
      }
    });

    routeModalInstance
      .result
      .then(passedItem => {
        console.log('passedItem', passedItem);
        if (passedItem[0]) {
          vm.group.schedule[0].route = passedItem[0];
          console.log('vm.group.schedule.route:', vm.group.schedule[0].route);
        }
        vm.discardRouteChanges = passedItem[1];
      });

  }

}
