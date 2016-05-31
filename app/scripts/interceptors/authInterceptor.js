/**
 * Auth interceptor for HTTP and Socket request.It wiill add  JWT  token to each requests.
 *  Token is validated in server side
 */
(function() {

    'use strict';

    angular.module('app')
    .factory('AuthInterceptor', [
      '$q', '$injector', '$localStorage', '$translate',
      function(
        $q, $injector, $localStorage, $translate
      ) {
        return {
          /**
           * Interceptor method for $http requests. Main purpose of this method is to add JWT token
           * to every request that application does.
           * @param   {*} config  HTTP request configuration
           * @returns {*}
           */
          request: function requestCallback(config) {
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
              //config.headers.authorization = 'Bearer ' + token;
              config.headers.authorization = 'Bearer ' + token
              }
              return config;
          },

          /**
           * Interceptor method that is triggered whenever response error occurs on $http requests.
           * @param   {*} response
           * @returns {*|Promise}
           */
          responseError: function responseErrorCallback(response) {
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
      };
      }
    ])
  ;
}());
