(function(){
  'use strict';

  angular.module('sections.mastoria')
  .config(configRoutes);

  /* @ngInject */
  function configRoutes($stateProvider){

    $stateProvider
      .state('mastoria', {
          url: '/mastoria?order&orderby&only_offers&{profession[]:int}&{area[]:int}&near&q&lng&lat',
          reloadOnSearch : false,
          controller:'MastoriaController as vm',
          bindToController: true,
          cache: false,
          templateUrl: 'sections/mastoria/mastoria.html',
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
        templateUrl: 'sections/mastoria/mastori.html',
        ncyBreadcrumb: {
            label: 'Mastori',
            parent: 'mastoria'
        },
        resolve: {
          mastori: function(MastoriModel, $stateParams) {
            return MastoriModel.query({id: $stateParams.id}).$promise.then(function(mastori){
              return mastori;
            });
          }
        }
      });
  }
})();