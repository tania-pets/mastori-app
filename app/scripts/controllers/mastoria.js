'use strict';

/**
 * @ngdoc function
 * @name app.controller:MastoriaCtrl
 * @description
 * # MastoriaCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('MastoriaCtrl', ['$scope', '$state', '$rootScope', '$stateParams', 'uiGmapGoogleMapApi', 'MastoriModel', 'ProfessionModel', 'AreaModel',
    function ($scope, $state, $rootScope, $stateParams, uiGmapGoogleMapApi, MastoriModel, ProfessionModel, AreaModel) {

    var polyOptions = { fillColor: '#2c8aa7', color: '#2c8aa7', opacity: '0.3' };
    var polyOptionsChecked = { fillColor: 'orange', color: 'orange', opacity: '0.5' };

    $scope.professions = ProfessionModel.query();

    $scope.$watch('coords', function() {
	  		console.info('current location (scope)', $rootScope.coords);
        $scope.near = $rootScope.coords ? $rootScope.coords.lat + ',' + $rootScope.coords.lng : null;
    });
    $scope.coords = $rootScope.coords;

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

    $scope.map = {
      center: {
        latitude: 39.0742,
        longitude: 21.8243
      },
      pan: true,
      zoom: 6,
      options: {minZoom: 6},
      events: {},
      bounds: {},
      getPolyFill: function(model){
        if(!model){
          return;
        }

        return model.checked ? polyOptionsChecked : polyOptions;
      },
      polyEvents: {
        click: function (gPoly, eventName, polyModel) {
            $scope.toggleItem(polyModel.id, 'area[]');

            var options = _.indexOf($scope.params['area[]'], polyModel.id) >= 0 ? polyOptionsChecked : polyOptions;
            gPoly.setOptions(options);
        }
      },
      draw: undefined
    };

    uiGmapGoogleMapApi.then(function () {
      AreaModel.query(function(areas) {
        $scope.areas = areas;
        areas.map(function(area) {
            area.checked = _.indexOf($scope.params['area[]'], area.id) >= 0; // I do this ONLY to access the checked property inside getPolyLine
        })
      });
    });

  }]);
