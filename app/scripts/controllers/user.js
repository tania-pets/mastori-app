'use strict';


angular.module('app')
  .controller('ProfileCtrl', function ($scope, AuthService) {
      var user = AuthService.user();
      user.endUser = AuthService.isEndUser();
      user.mastori = AuthService.isMastori();
      $scope.me = user;

  });
