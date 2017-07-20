(function() {
  'use strict';

  angular.module('app')
    .service('MastoriModel', [
      'DataModel','Config',
      function(DataModel, Config) {

        return DataModel('/mastoria/:id', {id: '@id'}, {
        	query: {
			      method: 'GET',
			      isArray: false,
			      // transformResponse: function(data) {
			      //   return angular.fromJson(data).items;
			      // }
			    }
        });
      }
    ])
  ;
}());