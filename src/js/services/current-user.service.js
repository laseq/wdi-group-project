angular
  .module('runchApp')
  .service('CurrentUserService', CurrentUserService);

CurrentUserService.$inject = ['TokenService', '$rootScope', 'User'];
function CurrentUserService(TokenService, $rootScope, User) {
  const self = this;

  self.getUser = () => {
    const decoded = TokenService.decodeToken();

    if (decoded) {
      User
        .get({ id: decoded.id })
        .$promise
        .then(data => {
          self.currentUser = data;
          $rootScope.$broadcast('loggedIn');
        })
        .catch(err => {
          console.log('decoded error:', err);
        });
    }
  };

  self.retrieveUser = function() {
    const decoded = TokenService.decodeToken();

    if (decoded) {
      return User
        .get({ id: decoded.id })
        .$promise
        .then(data => {
          self.currentUser = data;
          console.log('self.currentUser:', self.currentUser);
        })
        .catch(err => {
          console.log('decoded error:', err);
        });
    }
  };

  self.removeUser = () => {
    self.currentUser = null;
    TokenService.removeToken();
    $rootScope.$broadcast('loggedOut');
  };

  self.getUser();
}
