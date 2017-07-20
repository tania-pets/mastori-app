(function () {
    'use strict';

    angular.module('components.countrymap')
        .directive('countryMap', [countrymap]);

    function countrymap() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
              extraOptions: '=',
              map: '=',
              markers: '=',
              zoomable: '=',
              lines: '='
            },
            template:
            '<div id="countryMap"></div>',
            link: function($scope, $el) {

                //the country map to be loaded
                $scope.country = $scope.country || 'greeceLow';
                $scope.markers = $scope.markers || [];
                $scope.lines = $scope.lines || [];
                $scope.zoomable = $scope.zoomable || false;

                var mapInit = function() {
                    $scope.map = AmCharts.makeChart("countryMap", {
                          type: "map",
                          imagesSettings: {
                              rollOverColor: "#fff",
                              rollOverScale: 3,
                              selectedScale: 3,
                              selectedColor: "#fff",
                              color: "#FC561F"
                          },
                          areasSettings: {
                              unlistedAreasColor: "#1998B6",
                              outlineAlpha: 0,
                              outlineThickness:0,
                          },
                          dataProvider: {
                              map: $scope.country,
                              images:$scope.markers,
                              lines: $scope.lines
                          },
                          zoomControl: {
              		          zoomControlEnabled: $scope.zoomable,
                            homeButtonEnabled: false
              	         },
                         panEventsEnabled: false,
                         dragMap: false,
                      });
                    $scope.map.addListener( "positionChanged", updateCustomMarkers);

                    //added to update customers when coming back to landig page from another state withou position changed
                    $scope.map.addListener( "rendered", updateCustomMarkers);
                    $scope.map.validateNow();

                  }

                mapInit();

                // this function will take current images on the map and create HTML elements for them
                function updateCustomMarkers (event) {
                    // get map object
                    var map = event.chart;
                    // go through all of the images
                    for( var x in map.dataProvider.images) {
                        // get MapImage object
                        var image = map.dataProvider.images[x];
                        // check if it has corresponding HTML element
                        if ('undefined' == typeof image.externalElement)
                            image.externalElement = createCustomMarker(image);
                        // reposition the element accoridng to coordinates
                        var xy = map.coordinatesToStageXY(image.longitude, image.latitude);
                        image.externalElement.style.top = xy.y + 'px';
                        image.externalElement.style.left = xy.x + 'px';
                    }
                }

                // this function creates and returns a new marker element
                function createCustomMarker(image) {
                    // create holder
                    var holder = document.createElement('div');

                    if (image.text) {
                      holder.innerHTML = image.text;
                      holder.style.color = image.color;
                      holder.style['font-size'] = image.fontSize;
                      holder.style['font-family'] = image.fontFamily;


                      holder.style.position = 'absolute';
                    }
                    else  {
                      holder.className = 'map-marker';
                      holder.title = image.title;
                      holder.style.position = 'absolute';
                      // maybe add a link to it?
                      if (undefined != image.url) {
                          holder.onclick = function() {
                              window.location.href = image.url;
                          };
                          holder.className += ' map-clickable';
                      }
                      // create dot
                      var dot = document.createElement('div');
                      dot.className = 'dot';
                      holder.appendChild(dot);
                      // create pulse
                      var pulse = document.createElement('div');
                      pulse.className = 'pulse';
                      holder.appendChild(pulse);
                    }
                    // append the marker to the map container
                    image.chart.chartDiv.appendChild(holder);

                    return holder;
                }

            }
        };
    }
})();
