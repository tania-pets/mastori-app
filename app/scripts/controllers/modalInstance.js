'use strict';

/**
 * @ngdoc function
 * @name app.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, data) {

    $scope.data = data;


    $scope.ok = function() {
        $uibModalInstance.close();
    };

    $scope.cancel = function() {
        $uibModalInstance.dismiss("cancel");
    };

  });
