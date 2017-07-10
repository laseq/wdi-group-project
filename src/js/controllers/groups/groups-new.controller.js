/*globals moment*/

angular
  .module('runchApp')
  .controller('GroupsNewCtrl', GroupsNewCtrl);

GroupsNewCtrl.$inject = ['$state', 'Group', 'CurrentUserService', 'TokenService', 'User', '$uibModal'];
function GroupsNewCtrl($state, Group, CurrentUserService, TokenService, User, $uibModal) {
  const vm = this;

  vm.create = groupsCreate;
  vm.openRouteCreate = openRouteCreate;
  vm.currentUser = User.get({ id: TokenService.decodeToken().id });
  vm.discardRouteChanges = false;

  // We're using angular moment-picker here and setting the minimum and maximum selectable times
  vm.minDateMoment = moment().add(5, 'minute');
  vm.maxDateMoment = moment().add(6, 'day');

  function groupsCreate() {
    vm.group.admin = vm.currentUser._id; // On the backend with req.user
    vm.group.members = vm.currentUser._id; // On the backend with req.user
    Group
      .save(vm.group)
      .$promise
      .then(() => {
        addGroupToUserDatabase();
      })
      .catch(err => console.log('groupsCreate error:', err));
  }

  function addGroupToUserDatabase() {
    vm.currentUser.groups.push(vm.group);
    User
      .update({ id: vm.currentUser._id }, vm.currentUser)
      .$promise
      .then(() => {
        $state.go('groupsIndex');
      });
  }

  function openRouteCreate() {
    const locationInput = document.getElementById('location');
    if (locationInput.value.length < 5) {
      vm.routeMessage = 'Fill in the start location postcode to access the route creator';
      return;
    }
    vm.routeMessage = '';
    var routeModalInstance = $uibModal.open({
      templateUrl: 'js/views/partials/groupCreateRouteModal.html',
      controller: 'CreateRouteCtrl as createRoute',
      size: 'lg',
      id: 'create-route-modal',
      resolve: {
        location: () => {
          return vm.group.schedule.location;
        },
        route: () => {
          return vm.group.schedule.route;
        },
        discard: () => {
          return vm.discardRouteChanges;
        }
      }
    });

    routeModalInstance
      .result
      .then(passedItem => {
        if (passedItem[0]) {
          vm.group.schedule.route = passedItem[0];
        }
        vm.discardRouteChanges = passedItem[1];
      });

  }

}
