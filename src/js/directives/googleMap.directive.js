angular
  .module('runchApp')
  .directive('googleMap', googleMap);

googleMap.$inject = ['$window'];
function googleMap($window) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="map-styling">GOOGLE MAP GOES HERE</div>',
    scope: {
      center: '='
    },
    link(scope, element) {
      console.log(element[0]);
      const map = new $window.google.maps.Map(element[0], {
        zoom: 14,
        center: scope.center
      });
      new $window.google.maps.Marker({
        position: scope.center,
        map: map
      });
    }
  };
}
