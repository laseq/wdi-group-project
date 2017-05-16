angular
  .module('runchApp')
  .factory('Group', Group);

Group.$inject = ['$resource', 'API'];
function Group($resource, API) {
  return $resource(`${API}/groups/:id`, { id: '@_id'}, {
    'update': { method: 'PUT' },
    'join': {
      method: 'GET',
      url: `${API}/groups/:id/join`
    }
  });
}
