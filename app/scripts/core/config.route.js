'use strict';

angular.module('app')
.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider,   $urlRouterProvider) {

        function loginRequired($q, $location, $rootScope, AuthService) {
          var deferred = $q.defer();
          if (AuthService.isAuthenticated()) {
            deferred.resolve();
          } else {
            $rootScope.redirectAfterLogin = $location.path();
            $location.path('/app/signin');
          }
          return deferred.promise;
        }

        function skipIfLoggedIn($q, $location, AuthService) {
          var deferred = $q.defer();
          if (AuthService.isAuthenticated()) {
            $location.path('/');
          } else {
            deferred.resolve();
          }
          return deferred.promise;
        }

        var main_layout = "views/layouts/main.html";
        $stateProvider
            .state('app', {
                abstract: true,
                url: '/app',
                templateUrl: main_layout
            })
            .state('app.home', {
                url: '/home',
                templateUrl: 'views/home.html',
                controller:'HomeCtrl',
                ncyBreadcrumb: {
                  label: 'Home'
                }
            })
            .state('app.mastoria', {
                url: '/mastoria?order&orderby&only_offers&{profession[]:int}&{area[]:int}&near&q&{userlocation}',
                reloadOnSearch : false,
                templateUrl: 'views/mastoria/list.html',
                controller:'MastoriaCtrl',
                ncyBreadcrumb: {
                  label: 'Mastoria',
                  parent: 'app.home'
                }
            })
            .state('app.mastori', {
                url: '/mastoria/:id',
                templateUrl: 'views/mastoria/one.html',
                controller:'MastoriCtrl',
                ncyBreadcrumb: {
                  label: '{{ ::mastori.last_name }} {{ ::mastori.first_name }}',
                  parent: 'app.mastoria'

                }
            })
            .state('app.signup', {
                url: '/signup',
                templateUrl: 'views/user/signup.html',
                resolve: {
                  skipIfLoggedIn: skipIfLoggedIn,
                },
                ncyBreadcrumb: {
                  label: 'Sign up',
                  parent: 'app.home'
                }
            })
            .state('app.signin', {
                url: '/signin',
                templateUrl: 'views/user/signin.html',
                resolve: {
                  skipIfLoggedIn: skipIfLoggedIn,
                },
                ncyBreadcrumb: {
                  label: 'Log in',
                  parent: 'app.home'
                }
            })
            .state('app.profile', {
                url: '/profile',
                controller:'ProfileCtrl',
                cache: false,
                templateUrl: 'views/user/profile.html',
                resolve: {
                  loginRequired: loginRequired,
                },
                ncyBreadcrumb: {
                  label: 'Profile',
                  parent: 'app.home'
                }
            })
            .state('app.forgot-password', {
                url: '/forgot-password',
                templateUrl: 'views/user/forgot-password.html',
                resolve: {
                  skipIfLoggedIn: skipIfLoggedIn,
                }
            })
            .state('app.404', {
                url: '/404',
                templateUrl: 'views/pages/404.html',
            })
            .state('app.500', {
                url: '/500',
                templateUrl: 'views/pages/500.html',
            })
            .state('app.blank', {
                url: '/blank',
                templateUrl: 'views/pages/blank.html',
            })
            .state('landing', {
                url: '/',
                templateUrl: 'views/pages/landing.html',
                controller:'LandingCtrl'
            })

             $urlRouterProvider
                .otherwise('/');
      }
    ]
  );
