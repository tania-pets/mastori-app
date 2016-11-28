
  angular.module('app')
    .controller('AddressCtrl', function ($scope, lazyLoadGoogleMaps) {
      $scope.locating = false;
      var autocomplete;
      var lat;
      var lng;
      var selectedLocation;
      var geocoder;
      var map, marker;
      if (!$scope.address) $scope.address = null;



      /*Address search, load google maps*/
      lazyLoadGoogleMaps.then(loadGoogleSearch);
      function loadGoogleSearch() {
        geocoder =  new google.maps.Geocoder();
        var input = document.getElementById('address-input');
        autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.addListener('place_changed', function () {
            selectPlace();
        });
        //edit mode
        if($scope.address) {
           $scope.addressText = $scope.address.address;
          getAddresFromText($scope.address.address, function(streetNumber, streetName, postal, city, country, location, place){
            selectPlace(place);
          });
        }

      }

      //specify address in inputs
      $scope.updateAddress = function() {
        var addressText = '';
        var addresKeys = ['streetname', 'streetnumber', 'city', 'country', 'zipcode'];
        angular.forEach(addresKeys, function(key, index){
          if($scope.address[key]) {
            addressText += ' ' + $scope.address[key];
          }
        });
        getAddresFromText(addressText, function(streetNumber, streetName, postal, city, country, location, place){
            map.panTo(location);
            marker.setPosition(location);
            angular.merge($scope.address,{address: addressText,lat:location.lat(), lng:location.lng(), streetname:streetName, streetnumber: streetNumber, city:city, country:country, zipcode: postal });
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
           getAddresFromText(place.formatted_address, function(streetNumber, streetName, postal, city, country, location, place){
             var lat = location.lat();
             var lng = location.lng();
             //init address obj
             if (!$scope.address) {
               $scope.address = {};
             }
             angular.merge($scope.address, {address:place.formatted_address,  lat:lat, lng:lat, streetname:streetName, streetnumber: streetNumber, city:city, country:country, zipcode: postal });
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
          var city, country, streetName, streetNumber, postal, location, place;
          angular.forEach(results, function(result){
            location = result.geometry.location;
            place = result;
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
          callback(streetNumber, streetName, postal, city, country, location, place);
        });
      }

      $scope.ok = function() {
        $scope.$close($scope.address);
      };

      $scope.cancel = function() {
        $scope.$close();
      };

    });
