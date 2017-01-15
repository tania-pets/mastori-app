'use strict';

/**
 * @ngdoc function
 * @name app.controller:phoneValidateCtrl
 * @description
 * # phoneValidateCtrl
 * Controller for phone validation
 */
angular.module('app')
  .controller('phoneValidateCtrl', ['$scope', 'UserModel',
    function ($scope, UserModel) {
    $scope.code_sent = false;
    $scope.resultText = '';


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
          if (res.error) {
            $scope.resultText = 'Ο κωδικός δεν είναι σωστός';
          } else {
            $scope.resultText = 'Οk. Eπιβεβαιώθηκες.';
          }
        });
      }
    }

  }]);
