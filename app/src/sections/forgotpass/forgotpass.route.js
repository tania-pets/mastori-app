(function(){
  'use strict';

  angular.module('sections.forgotpass')
  .config(configRoutes);

  /* @ngInject */
  function configRoutes($stateProvider){

    $stateProvider.state('forgotpass', {
        url: '/forgotpass',
        templateUrl: 'src/sections/forgotpass/forgotpass.html',
        controller:'ForgotPassController as vm',
        bindToController: true,
        resolve: {
          skipIfLoggedIn: function(RouterService){
            return RouterService.skipIfLoggedIn;
          }
        },
        ncyBreadcrumb: {
            label: 'Forgot Password',
            parent: 'landing'
        }
    });
  }
})();