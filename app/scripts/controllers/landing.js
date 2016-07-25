'use strict';

/**
 * @ngdoc function
 * @name app.controller:LandingCtrl
 * @description
 * # MainCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('LandingCtrl', function ($ocLazyLoad, $scope, lazyLoadGoogleMaps, ProfessionModel, AreaModel) {
    $ocLazyLoad.load('scripts/landing/modernizr.js');
    $ocLazyLoad.load('styles/landing/main.css');
    $ocLazyLoad.load('scripts/landing/app.js');

    /*Map*/
    $scope.mapMarkers = [{
        zoomLevel: 5,
        scale: 0.5,
        title: "Αθήνα",
        latitude: 37.9839,
        longitude: 23.7294
    },
      {
          zoomLevel: 5,
          scale: 0.5,
          title: "Θεσσαλονίκη",
          latitude: 40.6403,
          longitude: 22.9439
      },
      {
          zoomLevel: 5,
          scale: 0.5,
          title: "Αθήνα",
          text: "Αθήνα",
          color: "#fff",
          fontSize: '16px',
          fontFamily: ' "Roboto", "Helvetica Neue", Arial, sans-serif',
          latitude: 38.935413,
          longitude: 26.5906801
      },
      {
          zoomLevel: 5,
          scale: 0.5,
          title: "Θεσσαλονίκη",
          text: "Θεσσαλονίκη",
          color: "#fff",
          fontSize: '16px',
          fontFamily: ' "Roboto", "Helvetica Neue", Arial, sans-serif',
          latitude: 41.659674,
          longitude: 19.341553
      }
    ];

    $scope.mapLines = [{
            id: "line1",
            color: "#fff",
            alpha: 1,
            latitudes: [37.9839, 38.545413],
            longitudes: [23.7294, 26.376801]
        },
        {
          id: "line2",
          color: "#fff",
          alpha: 1,
          latitudes: [38.545413, 38.545413],
          longitudes: [26.376801, 27.791290]
        },
        {
          id: "line3",
          color: "#fff",
          alpha: 1,
          latitudes: [40.6403, 41.289674],
          longitudes: [22.9439, 21.489502]
        },
        {
          id: "line4",
          color: "#fff",
          alpha: 1,
          latitudes: [41.289674, 41.289674],
          longitudes: [21.489502, 19.001553]
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


    /*Address search*/

    var autocomplete;
    var lat;
    var lng;
    lazyLoadGoogleMaps.then(loadGoogleSearch);

    function loadGoogleSearch() {
      var input = document.getElementById('address-input');
      autocomplete = new google.maps.places.Autocomplete(input);
      //autocomplete.bindTo('bounds', $scope.map);
      autocomplete.addListener('place_changed', function () {
          selectPlace();
      });
    }

    function selectPlace() {
      var place = autocomplete.getPlace();
      if (!place.geometry) {
           window.alert("Autocomplete's returned place contains no geometry");
           return;
       } else {
         lat = place.geometry.location.lat();
         lng = place.geometry.location.lng();
         console.log( lng, lat);
       }
    }






    //capitalizes first letter
    function fistToUpper(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }


  });
