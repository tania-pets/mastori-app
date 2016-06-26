(function() {
  'use strict';

  angular.module('app')
    .service('AreaModel', [
      'DataModel','Config',
      function(DataModel, Config) {
        return DataModel('/areas/:id', {id: '@id'}, {});
      }
    ])
  ;
}());
