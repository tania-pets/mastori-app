(function(){
  'use strict';

  angular.module('components.login')
  .controller('AuthController', AuthController);

  /* @ngInject */
  function AuthController($rootScope, $scope, AuthService, AutModel, $state, $location, toaster) {

    var vm = this;

    activate();

    function activate(){

      angular.extend(vm, {
          user:      AuthService.user(),
          login:     login
      });

    }

    function login() {

      AuthService.login({email: vm.email, password: vm.password}, function(response){
        if (response.token) {
          // add support for login modal
          if ($scope.$parent && typeof $scope.$parent.$close === 'function') {
            $scope.$parent.$close();
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

  }

})();
