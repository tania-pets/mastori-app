(function() {
  'use strict';

  angular.module('app')
    .service('AutModel', [
      'DataModel','Config',
      function(DataModel, Config) {
          return DataModel('/auth');
      }
    ])
  ;
}());
