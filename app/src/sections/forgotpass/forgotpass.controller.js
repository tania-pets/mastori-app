(function(){
  'use strict';

  angular.module('sections.forgotpass')
  .controller('ForgotPassController', ForgotPassController);

  /* @ngInject */
  function ForgotPassController($scope, AutModel, toaster){

    var vm = this;

    activate();

    function activate(){

      angular.extend(vm, {
          reset: reset
      });

    }

    function reset(){
      AutModel.resetpass({email: vm.email}, function(response){
          toaster.pop('success', "Μια χαρά!", "Ο νέος σου κωδικός θα σταλθεί στο email σου!");
      }, function(response){
        if (response.status == 401) {
          toaster.pop('error', "Χμμμ!", "Φαίνεται πως το email που έβαλες δε βρέθηκε!");
        } else {
          toaster.pop('error', "Κατάρα!", "Κατί δεν πήγε καλά! Προσπάθησε άλλη μία φορά!");
        }
      });
    }
  }

})();