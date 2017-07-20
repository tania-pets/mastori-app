(function(){
  'use strict';

  angular.module('sections.signup')
  .controller('SignupController', SignupController);

  /* @ngInject */
  function SignupController($scope, $state, AuthService, UserModel, toaster){

    $scope.$on('user:updated', function (e, user) {
      if (vm.step == 1) {
        vm.nextStep();
      }
    });

    var vm = this,
        user = new UserModel(),
        step = 1;

    activate();

    function activate(){

      angular.extend(vm, {
          user: user,
          step: step,
          signup: signup,
          nextStep: nextStep,
          prevStep: prevStep
      });

    }

    function signup() {
      var pass = vm.user.password;
      vm.user.$save(function(saved){
        AuthService.login({email: vm.user.email, password: pass}, function(response){
        if (response.token) {
          $state.go('landing', {referrer:'signup'});
        } else {
           $state.go('login');
        }
      });
      }, function(error){
        var errorMsg = "Κάτι δεν πήγε καλά.. Ξαναπροσπάθησε παρακαλώ!";
        if (error.data && error.data.errors && error.data.errors.email) {
          errorMsg = "Φαίνεται πως το email που δήλωσες ήδη χρησιμοποιείται!";
        }
        toaster.pop('error', "Ουπς!", errorMsg);
      });
    }

    function nextStep() {
      vm.step++;
    }

    function prevStep() {
      vm.step--;
    }
  }

})();