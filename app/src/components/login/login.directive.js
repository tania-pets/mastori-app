(function(){

  'use strict';

  angular.module('components.login')
  .directive('login', [login])

  function login() {
    return {
      restrict: 'E',
      replace: 'true',
      templateUrl: 'components/login/login.html',
      controller: 'AuthController',
      controllerAs: 'vm',
      bindToController: true,
      scope: {

      }
    };
  }
})();