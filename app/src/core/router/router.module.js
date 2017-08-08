(function(){
	angular.module('core.router', [
		'ui.router'
	])
	.config(routes)
	.run(['$state', '$rootScope', 'AuthService', run]);

	function routes ($stateProvider, $urlRouterProvider) {
		// stateProvider.html5Mode(true);
		$urlRouterProvider.otherwise('/');
		$stateProvider
      .state('app', {
          abstract: true,
          url: '/app',
          templateUrl: 'views/layouts/main.html'
      })
	}

	/* @ngInject */
  function run($state, $rootScope, AuthService) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      if (toState.loginRequired && !AuthService.isAuthenticated()){
        // User isn’t authenticated and state requires log in
        $state.transitionTo('login', {notify: false}); // no need to run this watcher again
        $rootScope.redirectAfterLogin = toState.name;
        event.preventDefault();
      } else if (toState.skipIfLoggedIn && AuthService.isAuthenticated()) {
        // User is authenticated and state is only for non authenticated users
        $state.transitionTo('landing', {notify: false}); // no need to run this watcher again
        event.preventDefault();
      }
    });
  }

})();