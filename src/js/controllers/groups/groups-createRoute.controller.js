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
  // vm.previousroute = route;
  vm.pathArray = [];
  vm.discard = discard;

  function closeModal() {
    vm.pathArray = [];
    vm.polypath = [];
    vm.route = vm.previousroute;
    vm.discard = true;
    // $uibModalInstance.close([vm.pathArray, vm.discard]);
    $uibModalInstance.close([vm.previousroute, vm.discard]);
  }

  function saveRoute() {
    console.log('*********** Entered saveRoute');
    console.log('vm.pathArray in save:', vm.pathArray);
    console.log('vm.route in save:', vm.route);
    console.log('vm.previousroute in save:', vm.previousroute);
    vm.previousroute = vm.route;
    vm.discard = false;
    $uibModalInstance.close([vm.pathArray, vm.discard]);
  }

  function undoLastPath() {
    console.log('************ Entered undoLastPath');
    if (vm.pathArray.length > 1){
      vm.pathArray.pop();
      vm.path.pop();
    }
    console.log('vm.pathArray in undo:', vm.pathArray);
  }

  function clearPath() {
    console.log('********** Entered clearPath');
    //directivePathArray = [];
    vm.pathArray.splice(1);
    vm.poly.setPath([vm.coords]);
    vm.path = vm.poly.getPath();

    console.log('vm.pathArray in clear:', vm.pathArray);
  }

}
