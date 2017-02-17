'use strict';

/**
 * @ngdoc function
 * @name app.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('HomeCtrl', function ($scope, ProfessionModel, $state, $rootScope, AuthService) {
    $scope.professions = ProfessionModel.query();
    //check referrer
    if($state.params && $state.params.referrer){
      var referrer = $state.params.referrer;
      //if comes from sign up, let user validate his phone now
      if(referrer == 'signup') {
        var user = AuthService.user();
        if(!user.mobile_verified) {
          $rootScope.openModal('lg', 'views/endusers/partials/_phone_validate.html', {user:user});
        }
      }
    }



  });
