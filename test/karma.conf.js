// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2016-01-04 using
// generator-karma 1.0.1

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      "jasmine"
    ],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-aria/angular-aria.js',
      'bower_components/angular-messages/angular-messages.js',
      'bower_components/angular-material/angular-material.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-ui-utils/ui-utils.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/angular-translate/angular-translate.js',
      'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
      'bower_components/rangy/rangy-core.js',
      'bower_components/rangy/rangy-classapplier.js',
      'bower_components/rangy/rangy-highlighter.js',
      'bower_components/rangy/rangy-selectionsaverestore.js',
      'bower_components/rangy/rangy-serializer.js',
      'bower_components/rangy/rangy-textrange.js',
      'bower_components/textAngular/dist/textAngular.js',
      'bower_components/textAngular/dist/textAngular-sanitize.js',
      'bower_components/textAngular/dist/textAngularSetup.js',
      'bower_components/toastr/toastr.js',
      'bower_components/angular-scroll/angular-scroll.js',
      'bower_components/Chart.js/Chart.js',
      'bower_components/angular-chart.js/dist/angular-chart.js',
      'bower_components/angular-validation-match/dist/angular-validation-match.min.js',
      'bower_components/angular-ui-tree/dist/angular-ui-tree.js',
      'bower_components/jquery.slimscroll/jquery.slimscroll.js',
      'bower_components/jquery.slimscroll/jquery.slimscroll.min.js',
      'bower_components/jquery-steps/build/jquery.steps.js',
      'bower_components/angular-busy/dist/angular-busy.js',
      'bower_components/spin.js/spin.js',
      'bower_components/angular-spinner/angular-spinner.js',
      'bower_components/ngstorage/ngStorage.js',
      'bower_components/ngInfiniteScroll/build/ng-infinite-scroll.js',
      'bower_components/angularjs-geolocation/src/geolocation.js',
      'bower_components/oclazyload/dist/ocLazyLoad.js',
      'bower_components/lodash/lodash.js',
      'bower_components/ammap3/ammap/ammap.js',
      'bower_components/angular-breadcrumb/release/angular-breadcrumb.js',
      'bower_components/AngularJS-Toaster/toaster.js',
      'bower_components/moment/moment.js',
      'bower_components/angular-moment/angular-moment.js',
      'bower_components/angular-password/angular-password.js',
      'bower_components/slick-carousel/slick/slick.js',
      'bower_components/angular-slick/dist/slick.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js',
      // endbower
      "app/scripts/**/*.js",
      "test/mock/**/*.js",
      "test/spec/**/*.js"
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      "PhantomJS"
    ],

    // Which plugins to enable
    plugins: [
      "karma-phantomjs-launcher",
      "karma-jasmine"
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
