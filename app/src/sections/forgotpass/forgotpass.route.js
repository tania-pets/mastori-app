(function(){
  'use strict';

  angular.module('sections.forgotpass')
  .config(configRoutes);

  /* @ngInject */
  function configRoutes($stateProvider){

    $stateProvider.state('forgotpass', {
        url: '/forgotpass',
        templateUrl: 'sections/forgotpass/forgotpass.html',
        controller:'ForgotPassController as vm',
        bindToController: true,
        skipIfLoggedIn: true,
        ncyBreadcrumb: {
            label: 'Forgot Password',
            parent: 'landing'
        }
    });
  }
})();