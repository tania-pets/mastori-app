'use strict';

/**
 * @ngdoc function
 * @name app.controller:LandingCtrl
 * @description
 * # MainCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('LandingCtrl', function ($ocLazyLoad, $timeout) {
    $ocLazyLoad.load('scripts/landing/modernizr.js');
    $ocLazyLoad.load('styles/landing/main.css');
    $ocLazyLoad.load('scripts/landing/app.js');


        $timeout(function() {
            hideLoader();
            console.log('update with timeout fired')
        }, 1000);

        function hideLoader() {
          console.log('file');
            $('#loader-container').fadeOut("slow")
        }


  });
