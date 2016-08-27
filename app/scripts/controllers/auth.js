'use strict';

/**
 * @ngdoc function
 * @name app.controller:authCtrl
 * @description
 * # authCtrl
 * Controller for user auth functions
 */
angular.module('app')
  .controller('authCtrl', ['$scope', 'AuthService', '$state', 'toaster',
    function ($scope, AuthService, $state, toaster, $uibModalInstance) {

    $scope.login = function() {

      AuthService.login({email: $scope.email, password: $scope.password}, function(response){
        if (response.token) {
          // add support for login modal
          if (typeof $scope.$close === "function") {
            $scope.$close();
          } else {
            $state.go('app.home');
          }
        } else if (response.status == 401) {
          toaster.pop('error', "Ουπς!", "Λάθος email ή κωδικός. Δοκίμασε ξανά!");
        } else {
          toaster.pop('error', "Κατάρα!", "Κάτι δεν πήγε καλά! Προσπάθησε άλλη μία φορά!");
        }
      });
    }

    $scope.signup = function() {
        $location.url('/')
    }

    $scope.reset =    function() {
        $location.url('/')
    }

    $scope.unlock =    function() {
        $location.url('/')
    }

  }]);
