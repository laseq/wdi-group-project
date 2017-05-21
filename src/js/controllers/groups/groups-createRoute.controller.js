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
  vm.pathArray = [];

  function closeModal() {
    vm.pathArray = [];
    $uibModalInstance.close();
  }

  function saveRoute() {
    console.log('Entered saveRoute');
    console.log('vm.pathArray:', vm.pathArray);
  }

  function undoLastPath() {
    vm.pathArray.pop();
  }

}
