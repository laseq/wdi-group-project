angular
  .module('runchApp')
  .directive('googleMap', googleMap);
//need to change format to snake-case to reference in index.html

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
// use templateURL if template is being renered from a different file
// use template if you are defining template inside directive module
// link allows us to make access to DOM elements from inside the directive template
// JQLite - library in Angular, stripped down version of jQuery
// $window to bind to the window
