'use strict';


angular.module('app')
  .controller('ProfileCtrl', function ($scope, AuthService, $state, lazyLoadGoogleMaps) {
      var user = AuthService.user();
      user.endUser = AuthService.isEndUser();
      user.mastori = AuthService.isMastori();
      $scope.me = user;




  });

  angular.module('app')
    .controller('newAddressController', function ($scope,lazyLoadGoogleMaps) {
      var autocomplete;
      var lat;
      var lng;
      var selectedLocation;
      var geocoder;


      /*Address search, load google maps*/
      lazyLoadGoogleMaps.then(loadGoogleSearch);
      function loadGoogleSearch() {
        geocoder =  new google.maps.Geocoder();
        var input = document.getElementById('address-input');
        autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.addListener('place_changed', function () {
            selectPlace();
        });
      }
      /*user selects a place from autocomplete*/
      function selectPlace() {
        var place = autocomplete.getPlace();
        if (!place.geometry) {
             window.alert("Autocomplete's returned place contains no geometry");
             return;
         } else {
           lat = place.geometry.location.lat();
           lng = place.geometry.location.lng();
           selectedLocation = lng+','+lat;
           getCityCountryFromLocation(place.geometry.location, function(city, country){
             console.log(city);
             console.log(country);
           });
         };
      }


      /*gets city and country from give location*/
      var getCityCountryFromLocation = function(location, callback) {
        geocoder.geocode({location: location}, function (results, status) {
          var city;
          var country;
          angular.forEach(results, function(result){
            angular.forEach(result.address_components, function(r){
              angular.forEach(r.types, function(z){
                //find city
                if (z == "administrative_area_level_3") {
                  //put the city name in the form
                  city = r.long_name;
                }
                if (z == "country") {
                  country = r.long_name;
                }
              });
            })
          })
          callback(city, country);
        });
      }






    });
