(function(){
  'use strict';

  angular.module('components.appointments')
  .controller('AppointmentsController', AppointmentsController);

  /* @ngInject */
  function AppointmentsController($rootScope, $scope, $filter, moment, AppointmentModel) {

    $scope.$on('rating:created', function (e, rating) {
      var app = $filter('filter')(vm.appointments.data, {id: rating.appointment_id})[0];
      app.rating = rating;
    });

    $scope.$on('appointment:created', function (e, appointment) {
      debugger;
      vm.appointments.data = !vm.appointments.data ? [] : vm.appointments.data;
      vm.appointments.data.unshift(appointment); // add it first to appointments list
    });

    var vm = this,
      busyAp = false;

    activate();

    function activate(){

      angular.extend(vm, {
          appointments:   AppointmentModel.query(vm.queryParams, function(appointments){
            $rootScope.$broadcast('appointments:fetched', appointments);
          }),
          busyAp: busyAp,
          loadMoreAppointments:  loadMoreAppointments,
          canSubmitRating: canSubmitRating
      });

    }

    function loadMoreAppointments() {
      if (vm.busyAp) {
        return;
      }
      vm.busyAp = true;

      var page = vm.appointments.current_page + 1;
      var queryParams = angular.extend({page: page}, vm.queryParams);
      var oldData = vm.appointments.data;

      AppointmentModel.query(queryParams, function (data) {
        vm.busyAp = false;
        vm.appointments = data;
        vm.appointments.data = oldData.concat(data.data);
      });
    }

    function canSubmitRating(appointment) {
      var appointmentDeadline = new moment(appointment.deadline, "YYYY-MM-DD HH");
      var now = new moment();

      return appointment && now.diff(appointmentDeadline, 'hours') > 1;
    }


  }

})();
