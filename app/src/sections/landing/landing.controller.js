'use strict';

/**
 * @ngdoc function
 * @name app.controller:LandingController
 * @description
 * # MainCtrl
 * Controller of the app
 */
angular.module('sections.landing')
  .controller('LandingController', LandingController);

  function LandingController ($ocLazyLoad, $state, lazyLoadGoogleMaps, ProfessionModel, AreaModel, AuthService) {

    var vm = this,
      user = AuthService.user(),
      selectedProfession,
      professions,
      /*Map*/
      //markers and texts for cities that we serve
      mapMarkers = [
        {
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
      ],
      mapLines = [
        {
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
        }
      ],
    /*End Map*/

    //testimorials slides
      slides = [
        {id: 0, active: true,  img: 'images/g1.jpg', text: 'Εύγε! Είστε απίθανοι. Τέτοιο πράγμα δεν ξανάδα. Αγαπώ όλους τους μάστορές σας. Μόνο με το μαστόρι κάνω δουλειά.', name: 'Φωτεινή Μ.', date: 'Θεσσαλονίκη, Ιούνιος 2016'},
        {id: 1, active: false, img: 'images/landing/person.jpg', text: 'Εύγε! Είστε απίθανοι. Τέτοιο πράγμα δεν ξανάδα. Αγαπώ όλους τους μάστορές σας. Μόνο με το μαστόρι κάνω δουλειά.', name: 'Μανώλης Κ.', date: 'Θεσσαλονίκη, Ιούνιος 2016'}
      ],
      autocomplete,
      lat,
      lng,
      selectedLocation;

    activate();

    function activate(){

      angular.extend(vm, {
          user: user,
          selectedProfession: selectedProfession,
          professions: ProfessionModel.query(),
          mapMarkers: mapMarkers,
          mapLines: mapLines,
          slides: slides,
          querySearch: querySearch,
          searchTextChange: searchTextChange,
          selectedItemChange: selectedItemChange,
          search: search,
          selectedLocation: selectedLocation
      });


      angular.element(document).ready(function () {
        $('#loader-container').fadeOut('slow');
      });

      $ocLazyLoad.load(['scripts/landing/modernizr.js', 'styles/landing/main.css', 'scripts/landing/app.js'])
        .then(function() {
          loadPageFeatures();
        })

      /* Address search */
      lazyLoadGoogleMaps.then(loadGoogleSearch);
    }

    /* Professions */
    //search for professions
    function querySearch (query) {
        var results = query ? vm.professions.filter( createFilterFor(query) ) : vm.professions,
                deferred;
        return results;
    }
    //search change
    function searchTextChange (text) {
      //console.log('Text changed to ' + text);
    }
    //match found
    function selectedItemChange (item) {
      //console.log('Item changed to ' + JSON.stringify(item));
      vm.selectedProfession = item;
    }
    /* End Professions*/

    /*search mastoria*/
    function search () {
      var params = {};
      if (vm.selectedLocation) {
        params.userlocation = vm.selectedLocation;
      }
      if (vm.selectedProfession && vm.selectedProfession.id) {
        params['profession[]'] = vm.selectedProfession.id;
      }
      $state.go('mastoria', params);
    }

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
         vm.selectedLocation = lng+','+lat;
       }
    }

    //capitalizes first letter
    function fistToUpper(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

  }
