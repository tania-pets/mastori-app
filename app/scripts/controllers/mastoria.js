'use strict';

/**
 * @ngdoc function
 * @name app.controller:MastoriaCtrl
 * @description
 * # MastoriaCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('MastoriaCtrl', function ($scope, $state, $stateParams, MastoriModel) {

	  $scope.params = {
	    per_page: null,
	    page: null,
	    order: null,
	    orderby: null,
	    only_offers: null,
	    profession: null,
	    area: null
		};

    $scope.setParams = function(params) {
    	angular.extend($scope.params, params);
    	console.info($scope.params);

    	$scope.mastoria = MastoriModel.query($scope.params);
    	$state.go('app.mastoria', $scope.params);
    };

    $scope.setParams($stateParams);

  });
