'use strict';


angular.module('app')
  .controller('ProfileCtrl', function ($scope, AuthService, UserModel, $state, lazyLoadGoogleMaps, $uibModal) {
      var user = AuthService.user();
      user.endUser = AuthService.isEndUser();
      user.mastori = AuthService.isMastori();
      $scope.me = user;

      $scope.openAddressModal = function (address) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'views/endusers/partials/_new_address.html',
            // controller: 'AddressCtrl',
            scope: $scope,
            size: 'lg'
        });
        modalInstance.result.then(function (address) {
          var user = AuthService.user();
          UserModel.get({id:user.id}, function(userResource) {
            if(address) {
              if(address.id) { //edit address
                angular.forEach(userResource.addresses, function(current_adderess, i){
                  if(current_adderess.id == address.id) {
                    userResource.addresses[i] = address;
                  }
                })
              }
              else if(address.city && address.country && address.address) { //add address
    					    userResource.addresses.push(address);
                }
                saveAndpdateAddressList(userResource);
             }
            })
            $scope.address = null;
	      });
      }


      //open edit mode
      $scope.editAddress = function(address) {
        $scope.address = address;
        $scope.openAddressModal(address);
      }

      $scope.deleteAddress = function(address) {
        var user = AuthService.user();
        UserModel.get({id:user.id}, function(userResource) {
          angular.forEach(userResource.addresses, function(current_adderess, i){
            if(address.id == current_adderess.id) {
              userResource.addresses.splice(i, 1);
              //break;
            }
          });
          saveAndpdateAddressList(userResource);
        });
      }

      var saveAndpdateAddressList = function(userObj) {
        userObj.$save(function(userUpDated){
          $scope.me.addresses = userUpDated.addresses;
        });
      }
  });
