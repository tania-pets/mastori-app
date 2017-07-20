(function(){

  'use strict';

  angular.module('components.addresslist')
  .directive('addresslist', [addresslist])

  function addresslist() {
    return {
      restrict: 'E',
      replace: 'true',
      templateUrl: 'src/components/addresslist/addresslist.html',
      controller: 'AddressListController',
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        user: '='
      }
    };
  }
})();