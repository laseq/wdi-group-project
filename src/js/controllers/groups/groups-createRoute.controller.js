angular
  .module('runchApp')
  .controller('CreateRouteCtrl', CreateRouteCtrl);

CreateRouteCtrl.$inject = ['location', 'route', '$uibModalInstance'];
function CreateRouteCtrl(location, route, $uibModalInstance) {

  const vm = this;

  vm.location = location;
  vm.close = closeModal;
  vm.save = saveRoute;
  vm.undo = undoLastPath;
  vm.clear = clearPath;
  vm.route = route;
  vm.pathArray = [];

  function closeModal() {
    vm.pathArray = [];
    vm.polypath = [];
    $uibModalInstance.close();
  }

  function saveRoute() {
    console.log('Entered saveRoute');
    console.log('vm.pathArray in save:', vm.pathArray);
    $uibModalInstance.close(vm.pathArray);
  }

  function undoLastPath() {
    console.log('Entered undoLastPath');
    if (vm.pathArray.length > 1){
      vm.pathArray.pop();
      vm.path.pop();
    }
    console.log('vm.pathArray in undo:', vm.pathArray);
  }

  function clearPath() {
    console.log('Entered clearPath');
    //directivePathArray = [];
    vm.pathArray.splice(1);
    vm.poly.setPath([vm.coords]);
    vm.path = vm.poly.getPath();

    console.log('vm.pathArray in clear:', vm.pathArray);
  }

}
