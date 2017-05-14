angular
  .module('runchApp')
  .factory('AuthInterceptor', AuthInterceptor);

AuthInterceptor.$inject = [];
function AuthInterceptor() {
  return {
    request(config) {
      console.log('config:', config);
      return config;
    },
    response(res) {
      console.log('res:', res);
      return res;
    }
  };
}
