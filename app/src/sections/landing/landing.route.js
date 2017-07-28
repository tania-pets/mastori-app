(function(){
  'use strict';

  angular.module('sections.landing')
  .config(configRoutes);

  /* @ngInject */
  function configRoutes($stateProvider){

    $stateProvider.state('landing', {
        url: '/',
        templateUrl: 'src/sections/landing/landing.html',
        controller:'LandingController as vm',
        bindToController: true,
        ncyBreadcrumb: {
            label: 'Home'
        }
    });
  }
})();