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
            if(address.id) { //edit address

            }
            else if(address && address.city && address.country && address.address) { //add address
  					    userResource.addresses.push(address);
                userResource.$save();
  					    user.addresses.push(address);
              }
            })
            $scope.address = null;
	      });
      }

      $scope.editAddress = function(address) {
        $scope.address = address;
        $scope.openAddressModal(address);
      }
  });
