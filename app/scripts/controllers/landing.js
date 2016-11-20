'use strict';

/**
 * @ngdoc function
 * @name app.controller:LandingCtrl
 * @description
 * # MainCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('LandingCtrl', function ($ocLazyLoad, $scope, lazyLoadGoogleMaps, ProfessionModel, AreaModel, $state) {

    $ocLazyLoad.load(['scripts/landing/modernizr.js', 'styles/landing/main.css', 'scripts/landing/app.js'])
              .then(function() {
                loadPageFeatures();
              })

    /*Map*/

    //markers and texts for cities that we serve
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

    //the map lines
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
        }];
    /*End Map*/

    /*Professions*/

    //load professions
    var selectedProfession;
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
      selectedProfession = item;
    }
    /* End Professions*/


    /*Address search*/
    lazyLoadGoogleMaps.then(loadGoogleSearch);
    var autocomplete;
    var lat;
    var lng;
    var selectedLocation;

    function loadGoogleSearch() {
      var input = document.getElementById('address-input');
      autocomplete = new google.maps.places.Autocomplete(input);
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
         selectedLocation = lng+','+lat;
       }
    }

    /*search mastoria*/
    $scope.search = function() {
      var params = {};
      if (selectedLocation) {
        params.userlocation = selectedLocation;
      }
      if (selectedProfession && selectedProfession.id) {
        params['profession[]'] = selectedProfession.id;
      }
      $state.go('app.mastoria', params);
    }


    //capitalizes first letter
    function fistToUpper(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }


    angular.element(document).ready(function () {
      $('#loader-container').fadeOut('slow');
    });

    //testimorials slides
    $scope.slides = [{id: 0, active: true,  img: 'images/g1.jpg', text: 'Εύγε! Είστε απίθανοι. Τέτοιο πράγμα δεν ξανάδα. Αγαπώ όλους τους μάστορές σας. Μόνο με το μαστόρι κάνω δουλειά.', name: 'Φωτεινή Μ.', date: 'Θεσσαλονίκη, Ιούνιος 2016'},
                    {id: 1, active: false, img: 'images/landing/person.jpg', text: 'Εύγε! Είστε απίθανοι. Τέτοιο πράγμα δεν ξανάδα. Αγαπώ όλους τους μάστορές σας. Μόνο με το μαστόρι κάνω δουλειά.', name: 'Μανώλης Κ.', date: 'Θεσσαλονίκη, Ιούνιος 2016'}
                  ];


  });
