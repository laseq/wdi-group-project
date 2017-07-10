angular
  .module('runchApp')
  .controller('CreateRouteCtrl', CreateRouteCtrl);

CreateRouteCtrl.$inject = ['location', 'route', 'discard', '$uibModalInstance'];
function CreateRouteCtrl(location, route, discard, $uibModalInstance) {

  const vm = this;

  vm.location = location;
  vm.close = closeModal;
  vm.save = saveRoute;
  vm.undo = undoLastPath;
  vm.clear = clearPath;
  vm.route = route;
  vm.pathArray = [];
  vm.discard = discard;

  function closeModal() {
    vm.pathArray = [];
    vm.polypath = [];
    vm.route = vm.previousroute;
    vm.discard = true;
    $uibModalInstance.close([vm.previousroute, vm.discard]);
  }

  function saveRoute() {
    vm.previousroute = vm.route;
    vm.discard = false;
    $uibModalInstance.close([vm.pathArray, vm.discard]);
  }

  function undoLastPath() {
    if (vm.pathArray.length > 1){
      vm.pathArray.pop();
      vm.path.pop();
    }
  }

  function clearPath() {
    vm.pathArray.splice(1);
    vm.poly.setPath([vm.coords]);
    vm.path = vm.poly.getPath();
  }

}
