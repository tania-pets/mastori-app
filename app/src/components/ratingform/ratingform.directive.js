(function(){

  'use strict';

  angular.module('components.ratingform')
  .directive('ratingform', [ratingform])

  function ratingform() {
    return {
      restrict: 'E',
      replace: 'true',
      templateUrl: 'src/components/ratingform/ratingform.html',
      controller: 'RatingController',
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        appointment: '='
      }
    };
  }
})();