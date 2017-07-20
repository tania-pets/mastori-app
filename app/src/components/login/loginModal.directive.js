(function () {
    'use strict';

    angular.module('app')
        .directive('loginModal', ['$uibModal', loginModal]);

    function loginModal($uibModal) {
        return {
        	restrict: 'E',
          replace: true,
          scope: {
          	text: '='
          },
					template: '<a href ng-click="openLoginModal()">{{ ::text }}</a>',
					link: function($scope, $el) {
						$scope.openLoginModal = function () {

		            $scope.modalInstance = $uibModal.open({
		                templateUrl: 'src/components/login/login.modal.html',
		                size: 'lg'
		            });
		        };
					}
        };
    }
})();
