'use strict';


angular.module('app')
  .controller('ProfileCtrl', function ($scope, AuthService, $state) {
      $scope.me = AuthService.user();
      console.log($scope.me );

  });
