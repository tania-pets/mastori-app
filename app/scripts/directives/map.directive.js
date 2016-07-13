(function () {
    'use strict';

    angular.module('app')
        .directive('drillDownMap', ['$filter', drillDownMap]);

    function drillDownMap($filter) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
              selected: '=',
              areas: '='
            },
            template:
            '<div id="map"></div>',
            link: function($scope, $el) {

                $scope.mapAreas = {};
                $scope.areas = $scope.areas || [];
                $scope.selected = $scope.selected || [];
                $scope.defaultDataProvider = {};

                var prepareAreas = function() {
                    var groupAreas, prefecture, selected, selectedPrefecture;

                    angular.forEach($scope.areas, function(area) {

                        if (!area.parent_id) {
                            groupAreas = $scope.mapAreas['greekPrefectures'] = $scope.mapAreas['greekPrefectures'] || [];
                        } else {
                            prefecture = $filter('filter')($scope.areas, { id: area.parent_id }, true)[0];
                            groupAreas = $scope.mapAreas[prefecture.name] = $scope.mapAreas[prefecture.name] || [];
                            selected = $scope.selected.indexOf(area.id) >= 0;
                        }

                        if (selected) {
                            selectedPrefecture = prefecture.name;
                        }

                        groupAreas.push(
                            {
                                id: area.name,
                                _id: area.id,
                                parent_id: area.parent_id,
                                color: "#f89932",
                                showAsSelected: selected
                            }
                        );

                    });

                    $scope.prefectureDataProvider = {
                        mapURL: "svg/greekPrefectures.svg",
                        areas: $scope.mapAreas['greekPrefectures']
                    };

                    if (selectedPrefecture) {
                        $scope.defaultDataProvider = {
                            mapURL: "svg/" + selectedPrefecture + ".svg",
                            areas: $scope.mapAreas[selectedPrefecture]
                        };
                    } else {
                        $scope.defaultDataProvider = $scope.prefectureDataProvider;
                    }

                }

                var mapInit = function() {
                    $scope.map = AmCharts.makeChart("map", {
                        type: "map",
                        "theme": "none",
                        // projection:"winkel3",

                        areasSettings: {
                            autoZoom: true,
                            rollOverOutlineColor: "#c14e1a",
                            selectedColor: "#c14e1a",
                            color: "#f89932",
                            rollOverColor: "#c14e1a",
                            selectable: true
                        },

                        dataProvider: $scope.defaultDataProvider
                    } );

                    // monitor when home icon was clicked and also go to continents map
                    $scope.map.addListener( "clickMapObject", handleMapObjectClick );
                    $scope.map.addListener( "homeButtonClicked", handleGoHome );
                }

                var handleGoHome = function() {
                    setMapDataProvider($scope.prefectureDataProvider);
                }

                var handleMapObjectClick = function(event) {
                    if ( event.mapObject.id == "backButton" ) {
                        return handleGoHome();
                    }

                    if (!event.mapObject.parent_id) {
                        var mapDataProvider = {
                            mapURL: "svg/" + event.mapObject.id + '.svg',
                            areas: $scope.mapAreas[event.mapObject.id]
                        }
                        setMapDataProvider(mapDataProvider);
                    } else {
                        $scope.$emit('areaToggled', event.mapObject);
                    }

                    // deselect the area by assigning all of the dataProvider as selected object
                    $scope.map.selectedObject = $scope.map.dataProvider;

                    // toggle showAsSelected
                    event.mapObject.showAsSelected = !event.mapObject.showAsSelected;

                    // bring it to an appropriate color
                    $scope.map.returnInitialColor( event.mapObject );
                }

                var setMapDataProvider = function(mapDataProvider) {

                    $scope.map.dataProvider = mapDataProvider;
                    $scope.map.validateData();
                }

                prepareAreas();
                mapInit();

            }
        };
    }
})();
