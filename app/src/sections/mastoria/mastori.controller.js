(function(){
  'use strict';

  angular.module('sections.mastoria')
  .controller('MastoriController', MastoriController);

  /* @ngInject */
  function MastoriController($scope, mastori, AuthService){

    $scope.$on('user:logedin', function(event,data) {
      vm.user = AuthService.user();
      initloggedInActions();
    });

    $scope.$on('appointments:fetched', function(event,data) {
      vm.appointmentsTotalCount = data.total;
    });

    var vm = this,
      user = AuthService.user(),
      appointmentsTotalCount,
      appointmentQueryParams,
      appointmentsListType = 'user',
      activetab = 0;

    activate();

    function activate(){

      angular.extend(vm, {
          user: user,
          mastori: mastori,
          appointmentsTotalCount: appointmentsTotalCount,
          appointmentQueryParams: appointmentQueryParams,
          appointmentsListType: appointmentsListType,
          activetab: activetab
      });

      if (vm.user) {
        initloggedInActions();
      }
    }

    function initloggedInActions() {
      vm.appointmentQueryParams = {orderby: 'created_at', order: 'desc', user_id: vm.user.id};
    }
  }

})();