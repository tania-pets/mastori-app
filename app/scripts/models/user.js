(function() {
  'use strict';

  angular.module('app')
    .service('UserModel', [
      'DataModel','Config',
      function(DataModel, Config) {
        return DataModel('/users/:id', {id: '@id'}, {
          sendverificationcode: {
            url: Config.api.url + '/users/sendverificationcode',
            method:'GET'
          },
          verifycode: {
            url: Config.api.url + '/users/verifycode',
            params: {code: '@code'},
            method:'GET'
          },
          unique: {
            url: Config.api.url + '/users/unique',
            params: {field: '@field', value: '@value'},
            method:'GET'
          }
        });


      }
    ])
  ;
}());
