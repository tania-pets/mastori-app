(function(){

  'use strict';

  angular.module('components.ratings')
  .directive('ratings', [ratings])

  function ratings() {
    return {
      restrict: 'E',
      replace: 'true',
      templateUrl: 'src/components/ratings/ratings.html',
      controller: 'RatingsController',
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        queryParams: '=',
      }
    };
  }
})();