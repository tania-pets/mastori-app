'use strict';

/**
 * @ngdoc function
 * @name app.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('HomeCtrl', function ($scope, ProfessionModel) {
    $scope.professions = ProfessionModel.query();
  });
