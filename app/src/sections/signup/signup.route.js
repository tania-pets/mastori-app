(function(){
  'use strict';

  angular.module('sections.signup')
  .config(configRoutes);

  /* @ngInject */
  function configRoutes($stateProvider){

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'sections/signup/signup.html',
        controller:'SignupController as vm',
        bindToController: true,
        skipIfLoggedIn: true,
        ncyBreadcrumb: {
            label: 'Signup',
            parent: 'landing'
        }
    });
  }
})();