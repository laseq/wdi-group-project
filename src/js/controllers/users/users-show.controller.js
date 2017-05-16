angular
.module('runchApp')
.controller('UsersShowCtrl', UsersShowCtrl);

UsersShowCtrl.$inject = ['$stateParams', 'User', '$state'];

function UsersShowCtrl($state, User) {
  const vm = this;
  vm.user  = User.get($state); // $stateParams returns a resource but nothing inside
  // console.log(vm.user);

  // This will get the targeted users groups 
  // function getGroupDetails() {
  //   return Group
  //     .get($stateParams)
  //     .$promise
  //     .then(group => {
  //       vm.group = group;
  //       getAdminDetails();
  //       getMemberDetails();
  //       getCommenters();
  //     })
  //     .catch(err => console.log('error in getGroupDetails:', err));
  // }
}
