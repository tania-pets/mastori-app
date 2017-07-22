(function(){
  'use strict';

  angular.module('mastori.core', [
    /* Angular modules */
    'ngAnimate',
    'ngAria',
    'ngMessages',
    'ngMaterial',
    'ngStorage',
    'ngPassword',
    'ngResource',
    /* 3rd=party modules */
    'ui.utils',
    'ui.bootstrap',
    'pascalprecht.translate',
    'chart.js',
    'cgBusy',
    'angularSpinner',
    'infinite-scroll',
    'geolocation',
    'oc.lazyLoad',
    'ncy-angular-breadcrumb',
    'toaster',
    'angularMoment',
    'slickCarousel',
    'sticky',
    /* Cross-app modules */
    'core.constants',
    'core.interceptors',
    'core.router',
    'core.filters',
    'core.config',
    'core.run'
    //'core.lang',
  ]);

})();

