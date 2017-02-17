'use strict';

/**
 * @ngdoc function
 * @name app.controller:phoneValidateCtrl
 * @description
 * # phoneValidateCtrl
 * Controller for phone validation
 */
angular.module('app')
  .controller('phoneValidateCtrl', ['$scope', '$rootScope', '$timeout', 'UserModel', 'AuthService',
    function ($scope, $rootScope, $timeout, UserModel, AuthService) {
    $scope.code_sent = false;
    $scope.resultText = '';
    $scope.validated = false;

    $scope.sendCodeToUser = function() {
      $scope.we_send = true;
      UserModel.sendverificationcode(function(res) {
        if (res && res.status && res.status == 'ok') {
          $scope.code_sent = true;
          $scope.we_send = false;
        }
      })
    }

    $scope.verifyCode = function() {
      var code = $scope.vcode;
      if(code) {
        UserModel.verifycode({code:code}, function(res) {
          $scope.validated = true;
          var user = AuthService.user();
          user.mobile_verified =  1;
          AuthService.updateUserData(user);
          $scope.resultText = 'Οk. Eπιβεβαιώθηκες.';
          $timeout(function() {
            $rootScope.closeModal();
          }, 2000);
        }, function(error){
            $scope.resultText = 'Ο κωδικός δεν είναι σωστός';
        });
      }
    }

  }]);
