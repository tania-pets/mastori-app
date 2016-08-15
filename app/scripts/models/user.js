(function() {
  'use strict';

  angular.module('app')
    .service('UserModel', [
      'DataModel','Config',
      function(DataModel, Config) {
        return DataModel('/users/:id', {id: '@id'}, {});
      }
    ])
  ;
}());
