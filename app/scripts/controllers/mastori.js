'use strict';

/**
 * @ngdoc function
 * @name app.controller:MastoriaCtrl
 * @description
 * # MastoriaCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('MastoriCtrl', ['$scope', '$state', 'MastoriModel',
    function ($scope, $state, MastoriModel) {

    $scope.mastori = MastoriModel.query({id: $state.params.id});

}]);