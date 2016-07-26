angular.module('app').service('lazyLoadGoogleMaps', function lazyLoadApi($window, $q) {
  function loadScript() {
    //console.log('loadScript')
      // use global document since Angular's $document is weak
    var s = document.createElement('script')
    s.src = '//maps.googleapis.com/maps/api/js?sensor=false&language=el&callback=initMap&libraries=places'
    document.body.appendChild(s)
  }
  var deferred = $q.defer()

  $window.initMap = function() {
    deferred.resolve()
  }

  // if ($window.attachEvent) {
  //   $window.attachEvent('onload', loadScript)
  // } else {
  //   $window.addEventListener('load', loadScript, false)
  // }

  angular.element($window).bind('load', loadScript());

  return deferred.promise
});
