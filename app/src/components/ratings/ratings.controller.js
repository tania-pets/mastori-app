(function(){
  'use strict';

  angular.module('components.ratings')
  .controller('RatingsController', RatingsController);

  /* @ngInject */
  function RatingsController($rootScope, RatingModel) {

    var vm = this,
      busyAp = false,
      ratingQueryParams = {orderby: 'created_at', order: 'desc', mastori_id: vm.mastori.id, 'statistics': true};

    activate();

    function activate(){

      angular.extend(vm, {
          ratings:   RatingModel.query(ratingQueryParams, function(ratings){
            $rootScope.$broadcast('ratings:fetched', ratings);
          }),
          busyAp: busyAp,
          loadMoreRatings:  loadMoreRatings,
          range: range
      });

    }

    function loadMoreRatings() {
      debugger;
      if (vm.busyAp) {
          return;
      }
      vm.busyAp = true;

      var page = vm.ratings.current_page + 1;
      var queryParams = angular.extend({page: page}, ratingQueryParams);
      var oldData = vm.ratings.data;

      RatingModel.query(queryParams, function (data) {
          vm.busyAp = false;
          vm.ratings = data;
          vm.ratings.data = oldData.concat(data.data);
      });
    }

    function range(min, max, step) {
      step = step || 1;
      var input = [];
      for (var i = min; i <= max; i += step) {
          input.push(i);
      }
      return input;
    }

  }

})();
