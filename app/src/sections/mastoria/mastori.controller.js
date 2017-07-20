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

    $scope.$on('ratings:fetched', function(event,data) {
      vm.ratingsTotalCount = data.total;
    });

    $scope.$on('appointments:fetched', function(event,data) {
      vm.appointmentsTotalCount = data.total;
    });

    var vm = this,
      user = AuthService.user(),
      ratingsTotalCount,
      appointmentsTotalCount,
      appointmentQueryParams,
      ratingQueryParams = {orderby: 'created_at', order: 'desc', mastori_id: mastori.id},
      appointmentsListType = 'user';

    activate();

    function activate(){

      angular.extend(vm, {
          user: user,
          mastori: mastori,
          ratingsTotalCount: ratingsTotalCount,
          appointmentsTotalCount: appointmentsTotalCount,
          appointmentQueryParams: appointmentQueryParams,
          ratingQueryParams: ratingQueryParams,
          appointmentsListType: appointmentsListType
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