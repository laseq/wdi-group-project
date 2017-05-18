angular
  .module('runchApp')
  .service('CurrentUserService', CurrentUserService);

CurrentUserService.$inject = ['TokenService', '$rootScope', 'User'];
function CurrentUserService(TokenService, $rootScope, User) {
  const self = this;
  saveUser();

  let currentUser;

  return {
    user: currentUser,
    saveUser,
    getUser,
    removeUser
  };

  function getUser() {
    return currentUser;
  }

  function saveUser() {
    const decoded = TokenService.decodeToken();
    if (decoded) {
      User
        .get({ id: decoded.id })
        .$promise
        .then(data => {
          currentUser = data;
          $rootScope.$broadcast('loggedIn');
        })
        .catch(err => {
          console.log('decoded error:', err);
        });
    }
  }

  function removeUser() {
    self.currentUser = null;
    TokenService.removeToken();
    $rootScope.$broadcast('loggedOut');
  }
}
