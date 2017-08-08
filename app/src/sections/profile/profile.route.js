(function(){
  'use strict';

  angular.module('sections.profile')
  .config(configRoutes);

  /* @ngInject */
  function configRoutes($stateProvider){

    $stateProvider.state('profile', {
        url: '/profile',
        controller:'ProfileController as vm',
        bindToController: true,
        cache: false,
        templateUrl: 'src/sections/profile/profile.html',
        loginRequired: true,
        ncyBreadcrumb: {
            label: 'Profile',
            parent: 'landing'
        }
    });
  }
})();