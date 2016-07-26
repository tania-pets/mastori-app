(function () {
    'use strict';

    angular.module('app')
    .controller('AppCtrl', [ '$scope', '$rootScope', '$state', '$document', 'appConfig', '$translate', 'AuthService', 'geolocation',
     AppCtrl]) // overall control

    function AppCtrl($scope, $rootScope, $state, $document, appConfig, $translate, AuthService, geolocation) {
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

        $rootScope.$on("$stateChangeSuccess", function (event, currentRoute, previousRoute) {
            $rootScope.preloader = false;
            $document.scrollTo(0, 0);
        });

    }

})();
