(function(){
	angular.module('core.router', [
		'ui.router'
	])
	.config(routes);

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

})();