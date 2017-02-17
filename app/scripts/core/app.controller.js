(function () {
    'use strict';

    angular.module('app')
    .controller('AppCtrl', [ '$scope', '$rootScope', '$state', '$document', 'appConfig', '$translate', 'AuthService', 'geolocation', '$uibModal',
     AppCtrl]) // overall control

    function AppCtrl($scope, $rootScope, $state, $document, appConfig, $translate, AuthService, geolocation, $uibModal) {
        $scope.pageTransitionOpts = appConfig.pageTransitionOpts;
        $scope.main = appConfig.main;
        $scope.color = appConfig.color;
        $scope.AuthService = AuthService;
        $translate.use('el');
        $scope.$watch('main', function(newVal, oldVal) {
            // if (newVal.menu !== oldVal.menu || newVal.layout !== oldVal.layout) {
            //     $rootScope.$broadcast('layout:changed');
            // }

            if (newVal.menu === 'horizontal' && oldVal.menu === 'vertical') {
            $rootScope.$broadcast('nav:reset');
            }
            if (newVal.fixedHeader === false && newVal.fixedSidebar === true) {
            if (oldVal.fixedHeader === false && oldVal.fixedSidebar === false) {
                $scope.main.fixedHeader = true;
                $scope.main.fixedSidebar = true;
            }
            if (oldVal.fixedHeader === true && oldVal.fixedSidebar === true) {
                $scope.main.fixedHeader = false;
                $scope.main.fixedSidebar = false;
            }
            }
            if (newVal.fixedSidebar === true) {
            $scope.main.fixedHeader = true;
            }
            if (newVal.fixedHeader === false) {
            $scope.main.fixedSidebar = false;
            }
        }, true);

        geolocation.getLocation().then(function(data){
          $rootScope.coords = {lat:data.coords.latitude, lng:data.coords.longitude};
          console.info('current location', data.coords);
        });

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            $rootScope.preloader = true;
        });

        $rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState) {
            $rootScope.preloader = false;
            $document.scrollTo(0, 0);
        });

        $rootScope.openModal = function (size, template, data) {
          var modalInstance = $uibModal.open({
              animation: true,
              templateUrl:  template,
              controller: 'ModalInstanceCtrl',
              size: size,
              resolve: {
                  data: function () {
                      return data;
                  }
              }
          });
          $rootScope.closeModal = function() {
            modalInstance.close();
          };
          modalInstance.result.then(function (selectedItem) {
            }, function () {
            });
        };

        $scope.openLoginModal = function () {

            var modalInstance = $uibModal.open({
                templateUrl: 'views/user/signin-modal.html',
                controller: 'authCtrl',
                size: 'lg'
            });
        };

    }

})();
