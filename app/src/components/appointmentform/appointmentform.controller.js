(function(){
  'use strict';

  angular.module('components.appointmentform')
  .controller('AppointmentFormController', AppointmentFormController);

  /* @ngInject */
  function AppointmentFormController($rootScope, $filter, AuthService, AppointmentModel, moment, toaster) {

    var vm = this,
      user = AuthService.user(),
      today = new moment(),
      deadline = {
        maxDate: today.clone().add(1, 'month').toDate(),
        minDate: today.toDate()
      },
      allowedAppointmentAddresses = [];

    activate();

    function activate(){

      angular.extend(vm, {
          user: user,
          deadline: deadline,
          submitAppointment: submitAppointment,
          allowedAppointmentAddresses: allowedAppointmentAddresses
      });

      appointmentInit();
    }

    function appointmentInit() {
      vm.allowedAppointmentAddresses = $filter('matcher')(vm.user.addresses, vm.mastori.areas, 'area_id');

      vm.appointment = new AppointmentModel();
      vm.appointment.deadline = today.clone().add(1, 'day').toDate();
    };

    function submitAppointment(form) {
      vm.appointment.mastori_id = vm.mastori.id;
      vm.appointment.user_id = vm.user.id;

      form.$setPristine(); // clear form
      form.$setUntouched();

      vm.appointment.$save(function(saved){
        appointmentInit(); // reset appointment
        $rootScope.$broadcast('appointment:created', saved);

        toaster.pop('success', "Ωραίος!", "Το μαστόρι ενημερώθηκε για το ραντεβού! Επιπλέον κέρδισες " + saved.points_rewarded + " μαστοροπόντους!!");
      }, function(error){
        toaster.pop('error', "Ουπς!", "Κάτι δεν πήγε καλά.. Ξαναπροσπάθησε παρακαλώ!");
      });
    }

  }

})();
