'use strict';


angular.module('app')
  .controller('ProfileCtrl', function ($scope, AuthService, UserModel, $state, lazyLoadGoogleMaps, $uibModal) {
      var user = AuthService.user();
      user.endUser = AuthService.isEndUser();
      user.mastori = AuthService.isMastori();
      $scope.me = user;

      $scope.openAddressModal = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'views/endusers/partials/_new_address.html',
            // controller: 'AddressCtrl',
            size: 'lg'
        });
        modalInstance.result.then(function (address) {
          if(address && address.city && address.country && address.address) {
					  var user = AuthService.user();
					  UserModel.get({id:user.id}, function(userResource) {
					    userResource.addresses.push(address);
					    userResource.$save();
					    user.addresses.push(address);
					  })
	        }
	      });
      }
  });