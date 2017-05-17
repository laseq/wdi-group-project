// angular
//   .module('runchApp')
//   .directive('googleMap', googleMap);
//
// googleMap.$inject = ['$window'];
// function googleMap($window) {
//   return {
//     restrict: 'E',
//     replace: true,
//     template: '<div class="map-styling">GOOGLE MAP GOES HERE</div>',
//     scope: {
//       center: '='
//     },
//     link(scope, element) {
//       console.log(element[0]);
//       const map = new $window.google.maps.Map(element[0], {
//         zoom: 14,
//         center: scope.center
//       });
//       new $window.google.maps.Marker({
//         position: scope.center,
//         map: map
//       });
//     }
//   };
// }

// -----My Attempt----
angular
  .module('runchApp')
  .directive('googleMap', googleMap);

googleMap.$inject = ['$window', '$http'];
function googleMap($window, $http) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="map-styling">GOOGLE MAP GOES HERE</div>',
    scope: {
      location: '@'
    },
    link(scope, element) {
      scope.$watch('location', function(postcode){
        console.log('postcode:', postcode);
        console.log('location:', scope.location);

        const mergedPostcode = postcode.split(' ').join('');
        console.log('mergedPostcode:', mergedPostcode);

        if (postcode) {
          $http({
            method: 'GET',
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${postcode}&key=AIzaSyC4JQgV8ccrZQWkaBr0uIaeVNlLWH1hvzY`
          })
          .then(function successCallback(response) {
            const coordinates = response.data.results['0'].geometry.location;
            console.log('coordinates:', coordinates);

            const map = new $window.google.maps.Map(element[0], {
              zoom: 15,
              center: coordinates
            });

            new $window.google.maps.Marker({
              position: coordinates,
              map: map
            });
          },
          function errorCallback(response){
            console.log('Error response:', response);
          });
        }

      }); // End of scope.$watch
    } // End of link(scope, element)
  }; // End of return
} // End of function googleMap($window, $http)


// -----Lourenco's Code ------
// googleMap.$inject = ['$window', '$http'];
// function googleMap($window, $http) {
//   return {
//     restrict: 'E',
//     replace: true,
//     template: '<div class="map-styling">GOOGLE MAP GOES HERE</div>',
//     scope: {
//       origin: '@'
//     },
//     link(scope, element) {
//
//       scope.$watch('origin', function(location){
//         console.log('location:', location);
//         console.log('origin:', scope.origin);
//
//         if (location) {
//           $http({
//             method: 'GET',
//             url: `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyCnKlCHThE_n_gwYdwXd5GL5XA2_mDOguY`
//           }).then(function successCallback(response) {
//             const coOrds = response.data.results['0'].geometry.location;
//
//             var map = new $window.google.maps.Map(element[0], {
//               zoom: 4,
//               center: coOrds
//             });
//
//             new $window.google.maps.Marker({
//               position: coOrds,
//               map: map
//             });
//
//           }, function errorCallback(response) {
//             console.log('Error response:', response);
//           });
//         }
//
//       }); // End of scope.$watch
//     } // End of link(scope, element)
//   }; // End of return
// } // End of function googleMap($window, $http)
//
//

// --------------including postcode----------------
// 'use strict';
// angular.module('MY_APP_NAME')
//     .directive('googleMap', function () {
//         return {
//             template: '<div id="map" class="gmap"></div>',
//             restrict: 'E',
//             link: function postLink(scope, element, attrs){
//
// 	            var geocoder = new google.maps.Geocoder();
//
// 	            // Get longitude and latitude values from Google and render the map, or use longitude and latitude from position attribute
// 	            if(attrs.postcode){
// 		            geocoder.geocode({'address': attrs.postcode}, function(results, status){
// 			            if(status == google.maps.GeocoderStatus.OK){
// 				            renderMap({lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()})
// 			            }
// 		            });
// 	            }else{
// 		            renderMap(attrs.position);
// 	            }
//
// 	            function renderMap(pos){
// 		            var mapOptions = {
// 			            zoom: 10,
// 			            center: {lat: pos.lat, lng: pos.lng}
// 		            }
//
// 		            var map = new google.maps.Map(document.getElementById('map'), mapOptions);
//
// 		            var marker = new google.maps.Marker({
// 			            position: mapOptions.center,
// 			            map: map
// 		            });
// 	            }
//             }
//         };
//     });
