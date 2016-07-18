(function() {
  'use strict';

  angular.module('app')
    .service('AppointmentModel', [
      'DataModel',
      function(DataModel) {
        return DataModel('/appointments/:id', {id: '@id'}, {
        	query: {
			      method: 'GET',
			      isArray: false
			    }
        });
      }
    ])
  ;
}());
