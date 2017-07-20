(function(){
  'use strict';

  angular.module('components.ratings')
  .controller('RatingsController', RatingsController);

  /* @ngInject */
  function RatingsController($rootScope, RatingModel) {

    var vm = this,
      busyAp = false;

    activate();

    function activate(){

      angular.extend(vm, {
          ratings:   RatingModel.query(vm.queryParams, function(ratings){
            $rootScope.$broadcast('ratings:fetched', ratings);
            vm.ratingAvg = ratings.data.length ==0 ? 0 : calculateAverage(ratings);
          }),
          busyAp: busyAp,
          loadMoreRatings:  loadMoreRatings,
          range: range
      });

    }

    function loadMoreRatings() {
      if (vm.busyAp) {
          return;
      }
      vm.busyAp = true;

      var page = vm.ratings.current_page + 1;
      var queryParams = angular.extend({page: page}, vm.queryParams);
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

   //calculates the average rating
    var calculateAverage = function(ratings){
      var sum = 0;
      for(var i = 0; i < ratings.data.length; i++){
        sum += parseInt(ratings.data[i].rating);
      }
      var avg = sum/ratings.data.length;
      return avg;
    };

  }

})();
