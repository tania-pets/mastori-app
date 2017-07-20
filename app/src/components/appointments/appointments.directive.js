(function(){

  'use strict';

  angular.module('components.appointments')
  .directive('appointments', [appointments])

  function appointments() {
    return {
      restrict: 'E',
      replace: 'true',
      templateUrl: 'src/components/appointments/appointments.html',
      controller: 'AppointmentsController',
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        queryParams: '=',
        for: '='
      }
    };
  }
})();