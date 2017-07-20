(function(){

  'use strict';

  angular.module('components.profileform')
  .directive('profileform', [profileform])

  function profileform() {
    return {
      restrict: 'E',
      replace: 'true',
      templateUrl: 'src/components/profileform/profileform.html',
      controller: 'ProfileFormController',
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        user: '='
      },
    };
  }
})();