(function() {
  'use strict';

  angular.module('app')
    .service('ProfessionModel', [
      'DataModel','Config',
      function(DataModel, Config) {
        return DataModel('/professions/:id', {id: '@id'}, {});
      }
    ])
  ;
}());
