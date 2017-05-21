angular
  .module('runchApp')
  .controller('CreateRouteCtrl', CreateRouteCtrl);

CreateRouteCtrl.$inject = ['location','$uibModalInstance'];
function CreateRouteCtrl(location, $uibModalInstance) {

  const vm = this;

  vm.location = location;
  vm.close = closeModal;

  function closeModal() {
    console.log('location:', vm.location);
    $uibModalInstance.close();
  }

}
