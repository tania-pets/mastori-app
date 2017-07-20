(function(){
  'use strict';

  angular.module('components.addressmodal')
  .controller('AddressModalController', AddressModalController);

  /* @ngInject */
  function AddressModalController($scope, $uibModalInstance, address) {

    $scope.address = address;

    $scope.cancel = function() {
      $uibModalInstance.dismiss();
    }

    $scope.$on('address:selected', function (e, address) {
      $uibModalInstance.close(address);
    });
  }

})();