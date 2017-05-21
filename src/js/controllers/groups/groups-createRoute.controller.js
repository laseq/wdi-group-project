angular
  .module('runchApp')
  .controller('CreateRouteCtrl', CreateRouteCtrl);

CreateRouteCtrl.$inject = ['location','$uibModalInstance'];
function CreateRouteCtrl(location, $uibModalInstance) {

  const vm = this;

  vm.location = location;
  vm.close = closeModal;
  vm.save = saveRoute;
  vm.undo = undoLastPath;
  vm.clear = clearPath;
  vm.pathArray = [];

  function closeModal() {
    vm.pathArray = [];
    $uibModalInstance.close();
  }

  function saveRoute() {
    console.log('Entered saveRoute');
    console.log('vm.pathArray in save:', vm.pathArray);
  }

  function undoLastPath() {
    console.log('Entered undoLastPath');
    if (vm.pathArray.length > 1) vm.pathArray.pop();
    console.log('vm.pathArray in undo:', vm.pathArray);
  }

  function clearPath() {
    console.log('Entered clearPath');
    //directivePathArray = [];
    vm.pathArray.splice(1);
    console.log('vm.pathArray in clear:', vm.pathArray);
  }

}
