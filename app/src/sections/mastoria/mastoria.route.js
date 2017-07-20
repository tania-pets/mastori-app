(function(){
  'use strict';

  angular.module('sections.mastoria')
  .config(configRoutes);

  /* @ngInject */
  function configRoutes($stateProvider){

    $stateProvider
      .state('mastoria', {
          url: '/mastoria',
          controller:'MastoriaController as vm',
          bindToController: true,
          cache: false,
          templateUrl: 'src/sections/mastoria/mastoria.html',
          ncyBreadcrumb: {
              label: 'Mastoria',
              parent: 'landing'
          }
      })
      .state('mastori', {
        url: '/mastoria/:id',
        controller: 'MastoriController as vm',
        bindToController: true,
        cache: false,
        templateUrl: 'src/sections/mastoria/mastori.html',
        ncyBreadcrumb: {
            label: 'Mastori',
            parent: 'mastoria'
        },
        resolve: {
          mastori: function(MastoriModel, $stateParams) {
            return MastoriModel.query({id: $stateParams.id});
          }
        }
      });
  }
})();