'use strict';

/**
 * @ngdoc function
 * @name app.controller:MastoriaCtrl
 * @description
 * # MastoriaCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('MastoriaCtrl', function ($scope, MastoriModel) {

	  $scope.params = {
	    per_page: null,
	    page: null,
	    order: null,
	    orderby: null,
	    only_offers: null,
	    profession: null,
	    area: null
		};

		$scope.mastoria = MastoriModel.query($scope.params);

    $scope.setParams = function(params) {
    	angular.forEach(params, function(value, key) {
    		$scope.params[key] = value;
    	});

    	$scope.mastoria = MastoriModel.query($scope.params);
    };

  });
