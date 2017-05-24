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
          return vm.group.schedule.location;
        },
        route: () => {
          return vm.group.schedule.route;
        }
      }
    });

    routeModalInstance
      .result
      .then(passedItem => {
        if (passedItem) {
          vm.group.schedule.route = passedItem;
          console.log('vm.group.schedule.route:', vm.group.schedule.route);
        }
      });

  }

}
