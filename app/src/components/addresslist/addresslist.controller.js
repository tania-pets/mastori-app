(function(){
  'use strict';

  angular.module('components.addresslist')
  .controller('AddressListController', AddressListController);

  /* @ngInject */
  function AddressListController($rootScope, $uibModal, AuthService, UserModel) {

    var vm = this;

    activate();

    function activate(){

      angular.extend(vm, {
          openAddressModal:     openAddressModal,
          editAddress:          editAddress,
          deleteAddress:        deleteAddress
      });

    }

    //open modal for add/edit address
    function openAddressModal() {

      var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: "src/components/addressmodal/addressmodal.html",
          controller: "AddressModalController",
          resolve: {
            address: function () {
              return vm.address
            }
          },
          size: 'lg'
      });
      modalInstance.result.then(function (address) {
        if (!vm.user.addresses) {
          vm.user.addresses = [address];
        }  else {
          var index = vm.user.addresses.indexOf(address);
          //edit mode
          if (index >=0 ) {
            vm.user.addresses[index] = address;
          } else {
            vm.user.addresses.push(address);
          }
        }
        $rootScope.$broadcast('user:updated');
        vm.address = null;
      });
    }

    //open modal on edit mode
    function editAddress(address) {
      vm.address = address;
      vm.openAddressModal();
    }

    //delete the address
    function deleteAddress(address) {
      var index = vm.user.addresses.indexOf(address);
      vm.user.addresses.splice(index, 1);
      $rootScope.$broadcast('user:updated');
    }

  }

})();