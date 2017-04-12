'use strict';

/**
 * @ngdoc function
 * @name app.controller:MastoriaCtrl
 * @description
 * # MastoriaCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('MastoriaCtrl', ['$scope', '$state', '$rootScope', '$stateParams', '$filter', '$anchorScroll', 'MastoriModel', 'ProfessionModel', 'AreaModel',
    function ($scope, $state, $rootScope, $stateParams, $filter, $anchorScroll, MastoriModel, ProfessionModel, AreaModel) {

    $scope.professions = ProfessionModel.query();
    $scope.areas = AreaModel.query();

    $scope.$watch('$root.coords', function() {
  		console.info('current location (MastoriaCtrl)', $rootScope.coords);
        $scope.near = $rootScope.coords ? $rootScope.coords.lat + ',' + $rootScope.coords.lng : null;
    });

    $scope.params = {
	    per_page: 50,
	    order: null,
	    orderby: null,
	    only_offers: null,
	    'profession[]': [],
	    'area[]': null,
	    near: null,
	    q: null
	};

    $scope.setParams = function(params) {
    	angular.extend($scope.params, params);
    	// console.info($scope.params);

    	$scope.mastoria = MastoriModel.query($scope.params);
    	$state.go('app.mastoria', $scope.params);
    };

    $scope.setParams($stateParams);


    $scope.toggleItem = function(itemId, itemKey) {

    	var params = {};
    	var items = $scope.params[itemKey] || [];
        var itemIndex = items.indexOf(itemId);

    	if (itemIndex >= 0) {
    		items.splice(items.indexOf(itemId), 1);

    	} else {
    		items.push(itemId);
    	}

    	params[itemKey] = items;
    	$scope.setParams(params);
    }

    $scope.loadMore = function() {
  		if ($scope.busy) {
  			return;
  		}
  		$scope.busy = true;

  		var page = $scope.mastoria.current_page + 1;
    	var queryParams = angular.extend({page: page}, $scope.params);
    	var oldData = $scope.mastoria.data;

    	MastoriModel.query(queryParams, function (data) {
    		$scope.busy = false;
    		$scope.mastoria = data;
    		$scope.mastoria.data = oldData.concat(data.data);
    	});
    }

    $scope.displayFilters = function () {
        $scope.showFilters = true;
        // scroll to filters
        $anchorScroll.yOffset = 100;
        $anchorScroll('filters');
    }

    $scope.hideFilters = function () {
        $scope.showFilters = false;
    }

    $scope.$on('resetAllAreas', function (e) {
      $scope.setParams({'area[]': []});
    });

    $scope.$on('areaToggled', function (e, mapArea) {
      $scope.toggleItem(mapArea._id, 'area[]');
    });

    $scope.$on('prefectureSelected', function (e, id) {
        var selectedAreasFromPrefecture = $filter('filter')($scope.areas, { parent_id: id }, true);

        if (selectedAreasFromPrefecture.length > 0) {
            $scope.setParams({'area[]': _.pluck(selectedAreasFromPrefecture, 'id')});
        }
    });

  }]);
