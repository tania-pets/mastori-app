(function() {
    'use strict';

    angular
        .module('core.router')
        .factory('RouterService', factory);

    /* @ngInject */
    function factory($q, $location, $rootScope, AuthService) {
      var service = {
          loginRequired: loginRequired,
          skipIfLoggedIn: skipIfLoggedIn
      };

      return service;

      function loginRequired($q, $location, $rootScope, AuthService) {
        var deferred = $q.defer();
        if (AuthService.isAuthenticated()) {
          deferred.resolve();
        } else {
          $rootScope.redirectAfterLogin = $location.path();
          $location.path('login');
        }
        return deferred.promise;
      }

      function skipIfLoggedIn($q, $location, AuthService) {
        var deferred = $q.defer();
        if (AuthService.isAuthenticated()) {
          $location.path('/');
        } else {
          deferred.resolve();
        }
        return deferred.promise;
      }
    }
})();