'use strict';

/**
 * @ngdoc function
 * @name app.controller:LandingCtrl
 * @description
 * # MainCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('LandingCtrl', function ($ocLazyLoad, $scope, $timeout, ProfessionModel, AreaModel) {
    $ocLazyLoad.load('scripts/landing/modernizr.js');
    $ocLazyLoad.load('styles/landing/main.css');
    $ocLazyLoad.load('scripts/landing/app.js');

    /*Map*/
    $scope.mapMarkers = [{
        zoomLevel: 5,
        scale: 0.5,
        title: "Athens",
        latitude: 37.9839,
        longitude: 23.7294
    },
      {
          zoomLevel: 5,
          scale: 0.5,
          title: "Thessaloniki",
          latitude: 40.6403,
          longitude: 22.9439
      }
    ];

    $scope.mapLines = [{
            id: "line1",
            color: "#fff",
            alpha: 1,
            latitudes: [37.9839, 32.9839],
            longitudes: [23.7294, 23.7294]
        }],
    /*End Map*/

    /*Professions*/

    //load professions
    $scope.professions = ProfessionModel.query();

    /**
     * Filter function for a query string
     */
    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        var firstUpperQuery = fistToUpper(query);
        var upperQuery = query.toUpperCase();
        return function filterFn(profession) {
            return (profession.title.indexOf(lowercaseQuery) === 0
                    || profession.title.indexOf(firstUpperQuery) === 0
                    || profession.title.indexOf(upperQuery) === 0
                    || profession.title.indexOf(query) === 0);
        };
    }
    //search for professions
    $scope.querySearch = function(query) {
        var results = query ? $scope.professions.filter( createFilterFor(query) ) : $scope.professions,
                deferred;
        return results;
    }
    //search change
    $scope.searchTextChange = function(text) {
      //console.log('Text changed to ' + text);
    }
    //match found
    $scope.selectedItemChange = function(item) {
      //console.log('Item changed to ' + JSON.stringify(item));
    }
    /* End Professions*/



    //capitalizes first letter
    function fistToUpper(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }


  });
