(function(){
  'use strict';

  angular.module('mastori.core', [
    /* Angular modules */
    'ngAnimate',
    'ngAria',
    'ngMessages',
    'ngMaterial',
    /* 3rd=party modules */
    'ui.utils',
    'ui.bootstrap',
    'ngResource',
    'pascalprecht.translate',
    'chart.js',
    'cgBusy',
    'angularSpinner',
    'ngStorage',
    'infinite-scroll',
    'geolocation',
    'oc.lazyLoad',
    'ncy-angular-breadcrumb',
    'toaster',
    'angularMoment',
    'ngPassword',
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

