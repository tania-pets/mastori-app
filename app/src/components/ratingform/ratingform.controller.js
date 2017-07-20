(function(){
  'use strict';

  angular.module('components.ratingform')
  .controller('RatingController', RatingController);

  /* @ngInject */
  function RatingController($rootScope, RatingModel, toaster) {

    var vm = this;

    activate();

    function activate(){

      angular.extend(vm, {
          rating:       new RatingModel(),
          submitRating: submitRating
      });
    }

    function submitRating(form) {
      form.$setPristine(); // clear form
      form.$setUntouched();

      vm.rating.mastori_id = vm.appointment.mastori.id;
      vm.rating.appointment_id = vm.appointment.id;

      vm.rating.$saveForMastori(function(rating){
          rating.appointment_id = vm.appointment.id;
          $rootScope.$broadcast('rating:created', rating);
          toaster.pop('success', "Κομπλέ!", "Σε ευχαριστούμε για την κριτική σου! Θα δημοσιευτεί μόλις την εγκρίνει ο μαστορο-admin! By the way, μόλις κέρδισες " + rating.points_rewarded + " μαστοροπόντους!!");
      }, function(error){
          toaster.pop('error', "Ουπς!", "Κάτι δεν πήγε καλά.. Ξαναπροσπάθησε παρακαλώ!");
      });
    }


  }

})();
