'use strict';

/**
 * @ngdoc function
 * @name app.controller:signupCtrl
 * @description
 * # signupCtrl
 * Controller for user registration
 */
angular.module('app')
  .controller('signupCtrl', ['$scope', '$rootScope', 'AuthService', '$state', 'toaster', 'UserModel', '$uibModal',
    function ($scope, $rootScope, AuthService, $state, toaster, UserModel, $uibModal) {

    $scope.user = {};
    $scope.me = $scope.user;
    $scope.mobileRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

    $scope.signup = function() {
      var user = new UserModel($scope.user);
      user.$save(function(saved){
        AuthService.login({email: $scope.user.email, password: $scope.user.password}, function(response){
        if (response.token) {
          $state.go('app.home');
        } else {
           $state.go('app.signin');
        }
      });
      }, function(error){
        var errorMsg = "Κάτι δεν πήγε καλά.. Ξαναπροσπάθησε παρακαλώ!";
        if (error.data && error.data.errors && error.data.errors.email) {
          errorMsg = "Φαίνεται πως το email που δήλωσες ήδη χρησιμοποιείται!";
        }
        toaster.pop('error', "Ουπς!", errorMsg);
      });
    }

    $scope.openAddressModal = function() {
      var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'views/endusers/partials/_new_address.html',
          size: 'lg'
      });
      modalInstance.result.then(function (address) {
        if(address && address.city && address.country && address.address) {
          if (!$scope.user.addresses) {
            $scope.user.addresses = [];
          }
          $scope.user.addresses.push(address);
        }
      });
    }

    $scope.step = 1;

    $scope.nextStep = function() {
        $scope.step++;
    }

    $scope.prevStep = function() {
        $scope.step--;
    }

  }]);
