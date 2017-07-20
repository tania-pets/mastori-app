(function(){
  'use strict';

  angular.module('components.profileform')
  .controller('ProfileFormController', ProfileFormController);

  /* @ngInject */
  function ProfileFormController($rootScope) {

    var vm = this;

    activate();

    function activate(){

      angular.extend(vm, {
          userUpdated:  userUpdated,
          mobileRegex: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
      });

    }

    function userUpdated(profileform) {
      profileform.$setPristine(); // clear form
      profileform.$setUntouched();
      $rootScope.$broadcast('user:updated', vm.user);
    }

  }

})();