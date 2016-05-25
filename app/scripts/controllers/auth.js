'use strict';

/**
 * @ngdoc function
 * @name app.controller:authCtrl
 * @description
 * # authCtrl
 * Controller for user auth functions
 */
angular.module('app')
  .controller('authCtrl', function ($scope) {

    $scope.login = function() {
        $location.url('/')
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
