(function(){
  'use strict';

  angular.module('sections.profile')
  .controller('ProfileController', ProfileController);

  /* @ngInject */
  function ProfileController($scope, AuthService, AppointmentModel, RatingModel, UserModel, toaster){

    $scope.$on('user:updated', function (e, user) {
      vm.user.$save(function(saved) {
      // update user in localStorage
          AuthService.updateUserData(saved);
          toaster.pop('success', "Ετοιμος!", "Τα στοιχεία του λογαριασμού σου ανανεώθηκαν με επιτυχία!");
      }, function(error){
          toaster.pop('error', "Ουπς!", "Κάτι δεν πήγε καλά.. Ξαναπροσπάθησε παρακαλώ!");
      });
    });

    var vm = this,
        user = new UserModel(AuthService.user()),
        appointmentQueryParams = {orderby: 'created_at', order: 'desc', user_id: user.id},
        appointmentsListType = 'user';

    activate();

    function activate(){

      angular.extend(vm, {
          user:                  user,
          appointmentQueryParams: appointmentQueryParams,
          appointmentsListType: appointmentsListType
      });

    }
  }

})();