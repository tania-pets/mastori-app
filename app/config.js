
(function() {
  'use strict';

  angular.module('app')
    .constant('Config', {
      api: {
         url: '@@API_URL',
       }
      }
    );

  angular.module('app').value('cgBusyDefaults',{
      message:'Loading Stuff',
      backdrop: false,
      templateUrl: 'views/partials/spinner.html',
      delay: 300,
      minDuration: 700,
      wrapperClass: ''
    });

}());
