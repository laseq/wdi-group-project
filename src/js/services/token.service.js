angular
  .module('runchApp')
  .service('TokenService', TokenService);

TokenService.$inject = ['$window', 'jwtHelper'];
function TokenService($window, jwtHelper) {
  const self = this;

  self.setToken = (token) => {
    return $window.localStorage.setItem('auth-token', token);
  };

  self.getToken = () => {
    return $window.localStorage.getItem('auth-token');
  };

  self.decodeToken = () => {
    const token = self.getToken();
    let decodedToken;
    if (token) {
      decodedToken = jwtHelper.decodeToken(token);
    } else {
      decodedToken = null;
    }
    return decodedToken;
    // return token ? jwtHelper.decodeToken(token) : null;
  };
}
