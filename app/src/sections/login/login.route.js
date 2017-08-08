(function(){
  'use strict';

  angular.module('sections.login')
  .config(configRoutes);

  /* @ngInject */
  function configRoutes($stateProvider){

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'src/sections/login/login.html',
        skipIfLoggedIn: true,
        ncyBreadcrumb: {
            label: 'Login',
            parent: 'landing'
        }
    });
  }
})();