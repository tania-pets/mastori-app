/**
 * Auth interceptor for HTTP and Socket request.It wiill add  JWT  token to each requests.
 *  Token is validated in server side
 */
(function() {

    'use strict';

    angular.module('core.interceptors', [])
      .factory('AuthInterceptor', factory);

    /* @ngInject */
    function factory($q, $injector, $localStorage, $translate) {
      var service = {
          request: requestCallback,
          responseError: responseErrorCallback
      };

      return service;

      function responseErrorCallback(response) {
        console.log('hee');
        if (response.status == 401) {
          if(response.data && response.data.error && response.data.error == 'token_expired'){
            if (response.data.error == 'token_expired'){
              $localStorage.$reset();
              $injector.get('$state').go('access.login-screen');
            }
            //   $localStorage.$reset();
            //   //AuthService.logout();
            //   $injector.get('$state').go('access.login-screen');
         }
        //     $localStorage.$reset();
        //     //$injector.get('$state').go('app.login-screen');
        }
        return $q.reject(response);
      }


      function requestCallback(config) {
        var token;
        if ($localStorage.credentials) {
          token = $localStorage.credentials.token;
        }
        config.headers.locale = $translate.use();
        if (token) {
          if (!config.data) {
            config.data = {};
          }
        /**
         * Set token to actual data and headers. Note that we need bot ways because of socket cannot modify
         * headers anyway. These values are cleaned up in backend side policy (middleware).
         */
          //config.data.token = token;
          config.headers.authorization = 'Bearer ' + token
        }
        return config;
      }

    }

})();
