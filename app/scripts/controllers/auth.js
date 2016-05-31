'use strict';

/**
 * @ngdoc function
 * @name app.controller:authCtrl
 * @description
 * # authCtrl
 * Controller for user auth functions
 */
angular.module('app')
  .controller('authCtrl', function ($scope, AuthService, $state) {

    $scope.login = function() {
      AuthService.login({email: $scope.email, password: $scope.password}, function(response){
        if (response.token) {
            $state.go('app.home')
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



  });
