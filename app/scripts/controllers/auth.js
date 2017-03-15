'use strict';

/**
 * @ngdoc function
 * @name app.controller:authCtrl
 * @description
 * # authCtrl
 * Controller for user auth functions
 */
angular.module('app')
  .controller('authCtrl', ['$scope', '$rootScope', 'AuthService', '$state', '$location', 'toaster',
    function ($scope, $rootScope, AuthService, $state, $location, toaster) {

    $scope.login = function() {

      AuthService.login({email: $scope.email, password: $scope.password}, function(response){
        if (response.token) {
          // add support for login modal
          if (typeof $scope.$close === 'function') {
            $scope.$close();
            // emit event
            $rootScope.$broadcast('user:logedin');
            // redirect only if current state applies only to guests
            if ($state.current.resolve && typeof $state.current.resolve.skipIfLoggedIn === 'function') {
              $state.go('landing');
            }
          } else {
            // redirect to previous state if it applies only to authenticated users
            if ($rootScope.redirectAfterLogin !== undefined) {

              $location.path($rootScope.redirectAfterLogin);
              $rootScope.redirectAfterLogin = null;
            } else {
              $state.go('landing');
            }
          }
        } else if (response.status == 401) {
          toaster.pop('error', "Ουπς!", "Λάθος email ή κωδικός. Δοκίμασε ξανά!");
        } else {
          toaster.pop('error', "Κατάρα!", "Κάτι δεν πήγε καλά! Προσπάθησε άλλη μία φορά!");
        }
      });
    }

    $scope.goTo = function(state) {
      // close modal
      if (typeof $scope.$close === 'function') {
        $scope.$close();
      }
      $state.go(state);
    }

    $scope.reset =    function() {
        $location.url('/')
    }

  }]);
