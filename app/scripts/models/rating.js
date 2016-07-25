(function() {
  'use strict';

  angular.module('app')
    .service('RatingModel', [
      'DataModel','Config',
      function(DataModel, Config) {
        return DataModel('/ratings/:id', {id: '@id'}, {
        	query: {
			      method: 'GET',
			      isArray: false
			    },
			    saveForMastori: {
		        url: Config.api.url + '/mastoria/:mastori_id/ratings',
		        params: {mastori_id: '@mastori_id'},
		        method:'POST'
			    }
        });
      }
    ])
  ;
}());
