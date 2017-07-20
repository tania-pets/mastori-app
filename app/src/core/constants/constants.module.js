
(function() {
  'use strict';

  angular.module('core.constants', [
  ])
  .constant('Config', {
    api: {
       url: 'http://dev.local.mastori-api',
      // / url: 'http://api.mastori.gr'
     }
    }
  );

    // angular.module('mastori.core').value('cgBusyDefaults',{
    //   message:'Loading Stuff',
    //   backdrop: false,
    //   templateUrl: 'views/partials/spinner.html',
    //   delay: 300,
    //   minDuration: 700,
    //   wrapperClass: ''
    // });

}());
