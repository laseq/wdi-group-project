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
          console.log('decoded data:', data);
        })
        .catch(err => {
          console.log('decoded error:', err);
        });
    }
  };
}
