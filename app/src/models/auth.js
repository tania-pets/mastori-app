(function() {
  'use strict';

  angular.module('app')
    .service('AutModel', [
      'DataModel','Config',
      function(DataModel, Config) {
        return DataModel('/auth', {}, {
        	resetpass: {
            url: Config.api.url + '/password/email',
            method:'POST'
          }
        });
      }
    ])
  ;
}());