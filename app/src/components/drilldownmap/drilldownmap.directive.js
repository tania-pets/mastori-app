(function () {
    'use strict';

    angular.module('components.drilldownmap')
        .directive('drillDownMap', ['$filter', drillDownMap]);

    function drillDownMap($filter) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
              selectedarea: '=',
              areas: '=',
              color: '=',
              selectedColor: '='
            },
            template:
            '<div id="map"></div>',
            link: function($scope, $el) {

                $scope.mapAreas = {};
                $scope.areas = $scope.areas || [];
                $scope.selectedarea = $scope.selectedarea || [];
                $scope.defaultDataProvider = {};
                $scope.color = $scope.color || "#f89932";
                $scope.selectedColor = $scope.selectedColor || "#c14e1a";

                var images = [ {
                    id: "selectAll",
                    label: "Select All",
                    labelColor: $scope.color,
                    rollOverColor: $scope.selectedColor,
                    labelRollOverColor: $scope.selectedColor,
                    useTargetsZoomValues: true,
                    left: 0,
                    bottom: 30,
                    labelFontSize: 13,
                    selectable: true
                },
                {
                    id: "selectNone",
                    label: "Select None",
                    labelColor: $scope.color,
                    rollOverColor: $scope.selectedColor,
                    labelRollOverColor: $scope.selectedColor,
                    useTargetsZoomValues: true,
                    left: 100,
                    bottom: 30,
                    labelFontSize: 13,
                    selectable: true
                } ];

                var prepareAreas = function() {
                    var groupAreas, prefecture, selectedarea, selectedPrefecture;

                    angular.forEach($scope.areas, function(area) {

                        if (!area.parent_id) {
                            groupAreas = $scope.mapAreas['greekPrefectures'] = $scope.mapAreas['greekPrefectures'] || [];
                        } else {
                            prefecture = $filter('filter')($scope.areas, { id: area.parent_id }, true)[0];
                            groupAreas = $scope.mapAreas[prefecture.name] = $scope.mapAreas[prefecture.name] || [];
                            selectedarea = $scope.selectedarea.indexOf(area.id) >= 0;
                        }

                        if (selectedarea) {
                            selectedPrefecture = prefecture.name;
                        }

                        groupAreas.push(
                            {
                                id: area.name,
                                _id: area.id,
                                parent_id: area.parent_id,
                                color: "#f89932",
                                showAsSelected: selectedarea
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
                            areas: $scope.mapAreas[selectedPrefecture],
                            images: images
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
                            autoZoom: false,
                            rollOverOutlineColor: $scope.selectedColor,
                            selectedColor: $scope.selectedColor,
                            color: $scope.color,
                            rollOverColor: $scope.selectedColor,
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

                var togglePrefecture = function(selected) {
                    angular.forEach($scope.map.dataProvider.areas, function(area){
                        area.showAsSelected = selected;
                    });
                    $scope.map.validateData();
                    if (selected) {
                        $scope.$emit('prefecture:selected', $scope.map.dataProvider.areas[0].parent_id);
                    } else {
                        $scope.$emit('areas:reset');
                    }
                }

                var handleMapObjectClick = function(event) {
                    if ( event.mapObject.id == "backButton" ) {
                        return handleGoHome();
                    }

                    if ( event.mapObject.id == "selectAll" ) {
                        return togglePrefecture(true);
                    }

                    if ( event.mapObject.id == "selectNone" ) {
                        return togglePrefecture(false);
                    }

                    if (!event.mapObject.parent_id) {
                        var mapDataProvider = {
                            mapURL: "svg/" + event.mapObject.id + '.svg',
                            areas: $scope.mapAreas[event.mapObject.id],
                            images: images
                        }
                        setMapDataProvider(mapDataProvider);
                    } else {
                        $scope.$emit('area:toggled', event.mapObject);
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
