(function(){
  'use strict';

  angular.module('sections.mastoria')
  .controller('MastoriaController', MastoriaController);

  /* @ngInject */
  function MastoriaController($scope, $state, $rootScope, $stateParams, $filter, $anchorScroll, $timeout, MastoriModel, ProfessionModel, AreaModel){

    $scope.$on('areas:reset', function (e) {
      vm.setParams({'area[]': []});
    });

    $scope.$on('area:toggled', function (e, mapArea) {
      vm.toggleItem(mapArea._id, 'area[]');
    });

    $scope.$on('prefecture:selected', function (e, id) {
      var selectedAreasFromPrefecture = $filter('filter')(vm.areas, { parent_id: id }, true);

      if (selectedAreasFromPrefecture.length > 0) {
          vm.setParams({'area[]': _.pluck(selectedAreasFromPrefecture, 'id')});
      }
    });

    var vm = this,
      params = {
        per_page: 50,
        order: null,
        orderby: null,
        only_offers: null,
        'profession[]': [],
        'area[]': null,
        near: null,
        q: null
      };

    activate();

    function activate(){

      angular.extend(vm, {
          params: params,
          professions: ProfessionModel.query(),
          areas: AreaModel.query(),
          setParams: setParams,
          toggleItem: toggleItem,
          loadMore: loadMore,
          displayFilters: displayFilters,
          hideFilters: hideFilters
      });

      vm.setParams($stateParams);
    }

    function setParams(params) {
      angular.extend(vm.params, params);
      // console.info(vm.params);

      vm.mastoria = MastoriModel.query(vm.params);
      $state.go('mastoria', vm.params);
    };

    vm.setParams($stateParams);


    function toggleItem(itemId, itemKey) {

      var params = {};
      var items = vm.params[itemKey] || [];
        var itemIndex = items.indexOf(itemId);

      if (itemIndex >= 0) {
        items.splice(items.indexOf(itemId), 1);

      } else {
        items.push(itemId);
      }

      params[itemKey] = items;
      vm.setParams(params);
    }

    function loadMore() {
      if (vm.busy) {
        return;
      }
      vm.busy = true;

      var page = vm.mastoria.current_page + 1;
      var queryParams = angular.extend({page: page}, vm.params);
      var oldData = vm.mastoria.data;

      MastoriModel.query(queryParams, function (data) {
        vm.busy = false;
        vm.mastoria = data;
        vm.mastoria.data = oldData.concat(data.data);
      });
    }

    function displayFilters() {
        vm.showFilters = true;
        // wait a bit so that filters are displayed and then scroll to filters
        $timeout( function(){
            $anchorScroll.yOffset = 100;
            $anchorScroll('filters');
        }, 100 );
    }

    function hideFilters() {
        vm.showFilters = false;
    }
  }

})();