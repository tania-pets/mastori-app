(function(){
  'use strict';

  angular.module('sections.signup')
  .config(configRoutes);

  /* @ngInject */
  function configRoutes($stateProvider){

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'src/sections/signup/signup.html',
        controller:'SignupController as vm',
        bindToController: true,
        resolve: {
          skipIfLoggedIn: function(RouterService){
            return RouterService.skipIfLoggedIn;
          }
        },
        ncyBreadcrumb: {
            label: 'Signup',
            parent: 'landing'
        }
    });
  }
})();