angular
  .module('runchApp')
  .controller('MaxRunnersCtrl', MaxRunnersCtrl);

MaxRunnersCtrl.$inject = ['group','$uibModalInstance'];
function MaxRunnersCtrl(group, $uibModalInstance) {

  const vm = this;

  vm.group = group;
  vm.close = closeModal;

  function closeModal() {
    console.log('Entered closeModal');
    $uibModalInstance.close();
  }

}
