(function(){

  'use strict';

  angular.module('components.appointmentform')
  .directive('appointmentform', [appointmentform])

  function appointmentform() {
    return {
      restrict: 'E',
      replace: 'true',
      templateUrl: 'src/components/appointmentform/appointmentform.html',
      controller: 'AppointmentFormController',
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        mastori: '='
      }
    };
  }
})();