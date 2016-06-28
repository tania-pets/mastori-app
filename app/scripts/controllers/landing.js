'use strict';

/**
 * @ngdoc function
 * @name app.controller:LandingCtrl
 * @description
 * # MainCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('LandingCtrl', function ($ocLazyLoad) {
    $ocLazyLoad.load('http://fonts.googleapis.com/css?family=Roboto:400,100,500,300,300italic,500italic|Roboto+Condensed:400,300');
    $ocLazyLoad.load('scripts/landing/modernizr.js');
    $ocLazyLoad.load('styles/landing/bootstrap.css');
    $ocLazyLoad.load('styles/landing/main.css');
    $ocLazyLoad.load('scripts/landing/app.js');



  });
