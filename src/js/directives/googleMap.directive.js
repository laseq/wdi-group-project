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
      location: '@',
      coords: '='
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

            const map = new $window.google.maps.Map(element[0], {
              zoom: 14,
              center: coordinates,
              styles: gMapStyles
            });

            new $window.google.maps.Marker({
              position: coordinates,
              map: map
            });

            var routeCoords = scope.coords;
            console.log('routeCoords:', routeCoords);
            console.log('typeof routeCoords:', typeof routeCoords);
            var route = new google.maps.Polyline({
              path: routeCoords,
              geodesic: true,
              strokeColor: '#000000',
              strokeOpacity: 1.0,
              strokeWeight: 3
            });
            console.log('Reached after route');
            route.setMap(map);

          },
          function errorCallback(response){
            console.log('Error response:', response);
          });
        }

      });
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
