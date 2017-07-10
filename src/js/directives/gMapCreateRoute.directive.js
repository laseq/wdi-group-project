/* globals google*/

angular
.module('runchApp')
.directive('gmapDrawRoute', gmapDrawRoute);

gmapDrawRoute.$inject = ['$window', '$http'];
function gmapDrawRoute($window, $http) {

  var map;
  var poly;
  var pathArray = [];

  return {
    restrict: 'E',
    replace: true,
    template: '<div class="map-styling">GOOGLE MAP GOES HERE</div>',
    scope: {
      location: '@',
      route: '=',
      previousroute: '=',
      patharray: '=patharray',
      pathundo: '&pathundo',
      path: '=path',
      poly: '=poly',
      coords: '=coords',
      discard: '='
    },
    link(scope, element) {
      scope.$watch('location', function(postcode){

        if (postcode) {
          $http({
            method: 'GET',
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${postcode}&key=AIzaSyC4JQgV8ccrZQWkaBr0uIaeVNlLWH1hvzY`
          })
          .then(function successCallback(response) {
            const coordinates = response.data.results['0'].geometry.location;
            scope.coords = response.data.results['0'].geometry.location;

            map = new $window.google.maps.Map(element[0], {
              zoom: 14,
              draggableCursor: 'crosshair',
              center: coordinates,
              styles: gMapStyles
            });

            new $window.google.maps.Marker({
              position: coordinates,
              map: map
            });

            // Choose either the route co-ords or the starting location co-ords
            // depending on whether a route has been saved previously or not
            // const arrayForPath = (!!scope.route) ? scope.route : [coordinates];
            let arrayForPath = [];

            if (!scope.previousroute){
              scope.previousroute = [];
              if (!scope.route) {
                scope.route = [];
              }
              scope.route[0] = scope.coords;
              const newArray = scope.route.map(a => Object.assign({}, a));
              scope.previousroute = newArray;
            }

            if (!!scope.route && !scope.discard) {
              arrayForPath = scope.route;

              scope.patharray = scope.route;

            } else if (scope.previousroute.length && scope.discard) {
              arrayForPath = scope.previousroute.map(a => Object.assign({}, a));

              const newArray = scope.previousroute.map(a => Object.assign({}, a));
              scope.patharray = newArray;
            } else {
              arrayForPath = [coordinates];

              scope.patharray.push(coordinates);
            }

            scope.poly = new google.maps.Polyline({
              path: arrayForPath,
              strokeColor: '#000000',
              strokeOpacity: 1.0,
              strokeWeight: 3
            });
            scope.poly.setMap(map);
            scope.path = scope.poly.getPath();

            // Add a listener for the click event
            map.addListener('click', addLatLng);
          },
          function errorCallback(response){
            console.log('Error response:', response);
          });
        }

      });

      // Handles click events on a map, and adds a new point to the Polyline.
      function addLatLng(event) {
        scope.path = scope.poly.getPath();

        // Because path is an MVCArray, we can simply append a new coordinate
        // and it will automatically appear.
        scope.path.push(event.latLng);

        const coordObj = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng()
        };
        scope.patharray.push(coordObj);
      }

    }
  };

}

const gMapStyles = [
  {
    'featureType': 'administrative',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#444444'
      }
    ]
  },
  {
    'featureType': 'administrative.land_parcel',
    'elementType': 'geometry',
    'stylers': [
      {
        'visibility': 'on'
      }
    ]
  },
  {
    'featureType': 'administrative.land_parcel',
    'elementType': 'labels',
    'stylers': [
      {
        'visibility': 'on'
      }
    ]
  },
  {
    'featureType': 'landscape',
    'elementType': 'all',
    'stylers': [
      {
        'color': '#f2f2f2'
      }
    ]
  },
  {
    'featureType': 'poi',
    'elementType': 'all',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  },
  {
    'featureType': 'road',
    'elementType': 'all',
    'stylers': [
      {
        'saturation': -100
      },
      {
        'lightness': 45
      }
    ]
  },
  {
    'featureType': 'road.highway',
    'elementType': 'all',
    'stylers': [
      {
        'visibility': 'simplified'
      }
    ]
  },
  {
    'featureType': 'road.highway',
    'elementType': 'geometry',
    'stylers': [
      {
        'visibility': 'simplified'
      },
      {
        'color': '#8EB77B'
      },
      {
        'lightness': '0'
      },
      {
        'saturation': '0'
      },
      {
        'weight': '1.82'
      }
    ]
  },
  {
    'featureType': 'road.highway',
    'elementType': 'geometry.fill',
    'stylers': [
      {
        'visibility': 'on'
      }
    ]
  },
  {
    'featureType': 'road.highway',
    'elementType': 'geometry.stroke',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  },
  {
    'featureType': 'road.highway',
    'elementType': 'labels.text',
    'stylers': [
      {
        'visibility': 'on'
      },
      {
        'weight': '3.59'
      },
      {
        'gamma': '0.36'
      }
    ]
  },
  {
    'featureType': 'road.highway',
    'elementType': 'labels.icon',
    'stylers': [
      {
        'visibility': 'on'
      },
      {
        'hue': '#ff0000'
      }
    ]
  },
  {
    'featureType': 'road.arterial',
    'elementType': 'geometry',
    'stylers': [
      {
        'visibility': 'on'
      },
      {
        'color': '#8EB77B'
      },
      {
        'weight': '0.14'
      }
    ]
  },
  {
    'featureType': 'road.arterial',
    'elementType': 'labels.icon',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  },
  {
    'featureType': 'transit',
    'elementType': 'all',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  },
  {
    'featureType': 'transit.station.airport',
    'elementType': 'geometry',
    'stylers': [
      {
        'visibility': 'on'
      }
    ]
  },
  {
    'featureType': 'transit.station.airport',
    'elementType': 'labels.text',
    'stylers': [
      {
        'visibility': 'on'
      }
    ]
  },
  {
    'featureType': 'transit.station.bus',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#912e2e'
      },
      {
        'visibility': 'off'
      }
    ]
  },
  {
    'featureType': 'water',
    'elementType': 'all',
    'stylers': [
      {
        'color': '#46bcec'
      },
      {
        'visibility': 'on'
      }
    ]
  },
  {
    'featureType': 'water',
    'elementType': 'geometry',
    'stylers': [
      {
        'visibility': 'simplified'
      },
      {
        'color': '#00b2dd'
      },
      {
        'weight': '0.31'
      },
      {
        'lightness': '0'
      }
    ]
  }
];
