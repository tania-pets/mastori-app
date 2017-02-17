/**
 * AuthService service which is used to authenticate users with backend server and provide simple
 * methods to check if user is authenticated or not.
 *
 * Within successfully login process service will store user data and JWT token to ngStorage where
 * those are accessible in the application.
 *
 * This service provides following methods:
 *
 *  AuthService.authorize(access)
 *  AuthService.isAuthenticated()
 *  AuthService.login(credentials)
 *  AuthService.logout()
 *
 * You can use this service fairly easy on your controllers and views if you like to. It's
 * recommend that you use this service with 'UserService' service in your controllers and
 * views.
 *
 * Usage example in controller:
 *
 *  angular
 *    .module('app')
 *    .controller('SomeController', [
 *      '$scope', 'AuthService', 'UserService',
 *      function ($scope, AuthService, UserService) {
 *        $scope.auth = AuthService;
 *        $scope.user = UserService.user;
 *      }
 *    ])
 *  ;
 *
 * Usage example in view:
 *
 *  <div data-ng-show="auth.isAuthenticated()">
 *      Hello, <strong>{{user().email}}</strong>
 *  </div>
 *
 * Happy coding!
 *
 * @todo  Revoke method?
 * @todo  Text localizations?
 */
(function() {
  'use strict';

  angular.module('app')
    .factory('AuthService',
      function factory(
         $state, $localStorage, AutModel
      ) {
        return {

          /**
           * Method to check if current user is authenticated or not. This will just
           * simply call 'Storage' service 'get' method and returns it results.
           *
           * @returns {Boolean}
           */
          isAuthenticated: function isAuthenticated() {
            return Boolean($localStorage.credentials && $localStorage.credentials.user);
          },

          //get logged user
          user: function user() {
            return ($localStorage.credentials && $localStorage.credentials.user) ? $localStorage.credentials.user : null;
          },
          updateUserData: function updateUserData(user){
            $localStorage.credentials.user = user;
          },
          /**
           * Method make login request to backend server. Successfully response from
           * server contains user data and JWT token as in JSON object. After successful
           * authentication method will store user data and JWT token to local storage
           * where those can be used.
           *
           * @param   {*} credentials
           *
           * @returns {*|Promise}
           */
          login: function login(credentials, cb) {
            AutModel.create(credentials,
              function(succes_response){
                $localStorage.credentials = succes_response;
                cb(succes_response);
              },
              function(error) {
                  cb(error);
              }
            );
          },
          isMastori: function isMastori() {
            return (this.user().type == 'mastori');
          },
          isEndUser: function isEndUser() {
            return (this.user().type == 'enduser');
          },
          /**
           * The backend doesn't care about actual user logout, just delete the token
           * and you're good to go.
           * Question still: Should we make logout process to backend side?
           */
          logout: function logout() {
            console.log('logout');
            $localStorage.$reset();
            $state.go('app.signin');
          }
        };
      }
    )
  ;
}());
