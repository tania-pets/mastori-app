
  angular.module('app')
    .controller('AddressCtrl', function ($scope, lazyLoadGoogleMaps) {
      $scope.address = null;
      $scope.locating = false;
      var autocomplete;
      var lat;
      var lng;
      var selectedLocation;
      var geocoder;
      var map, marker;

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

      //specify address in inputs
      $scope.updateAddress = function() {
        var address = $scope.address.streetName + ' ' + $scope.address.streetNumber + ' ' + $scope.address.city + ' ' + $scope.address.country + ' ' + $scope.address.postal;
        $scope.addressText = address;
        getAddresFromText(address, function(streetNumber, streetName, postal, city, country, location){
            map.panTo(location);
            marker.setPosition(location);
            $scope.address = {address: address,lat:location.lat(), lng:location.lng(), streetName:streetName, streetNumber: streetNumber, city:city, country:country, postal: postal };
        });
      }



      /*user selects a place from autocomplete*/
      function selectPlace(place) {
        $scope.locating =  true;
        if(!place) {
          var place = autocomplete.getPlace();
        }
        if (!place.geometry) {
             window.alert("Autocomplete's returned place contains no geometry");
             return;
         } else {
           getAddresFromText(place.formatted_address, function(streetNumber, streetName, postal, city, country, location){
             var lat = location.lat();
             var lng = location.lng();
             //init address obj
             $scope.address = {address:place.formatted_address,  lat:lat, lng:lat, streetName:streetName, streetNumber: streetNumber, city:city, country:country, postal: postal, };
             //load map
             var mapDiv = document.getElementById('map');
             map = new google.maps.Map(mapDiv, {
              center: {lat: lat, lng: lng},
              zoom: 16
            });
            //load marker
            marker = new google.maps.Marker({
              position: location,
              map: map
            });
            $scope.locating = false;
            $scope.$apply();
            google.maps.event.trigger(map, 'resize');
           });
         };
      }

      /*gets city and country from give location*/
      var getAddresFromText = function(address, callback) {
        geocoder.geocode({address: address}, function (results, status) {
          var city, country, streetName, streetNumber, postal, location;
          angular.forEach(results, function(result){
            location = result.geometry.location;
            angular.forEach(result.address_components, function(r){
              angular.forEach(r.types, function(z){
                //find city
                if (z == "administrative_area_level_3") {
                  //put the city name in the form
                  city = r.long_name;
                }
                if (z == "route") {
                  //put the city name in the form
                  streetName = r.long_name;
                }
                if (z == "street_number") {
                  //put the city name in the form
                  streetNumber = r.long_name;
                }
                if (z == "country") {
                  country = r.long_name;
                }
                if (z == "postal_code") {
                  postal = r.long_name;
                }
              });
            })
          })
          callback(streetNumber, streetName, postal, city, country, location);
        });
      }

      $scope.deleteAddress = function(address) {
        //alert('ddddd');
        console.log(address);
      };

      $scope.ok = function() {
        $scope.$close($scope.address);
      };

      $scope.cancel = function() {
        $scope.$close();
      };

    });
