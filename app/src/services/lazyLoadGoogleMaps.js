angular.module('app').service('lazyLoadGoogleMaps', function lazyLoadApi($window, $q) {

  function loadScript() {
      // use global document since Angular's $document is weak
    console.log('lazyLoadGoogleMaps');
    var s = document.createElement('script')
    s.src = '//maps.googleapis.com/maps/api/js?language=el&callback=initMap&libraries=places&key=AIzaSyDj8fnidV2ikQ1_zeY1CBfGlD-XtsL0KPM'
    document.body.appendChild(s)
  }
  var deferred = $q.defer()

  $window.initMap = function() {
    deferred.resolve()
  }

  //
  // if ($window.attachEvent) {
  //   console.log('1');
  //   $window.attachEvent('onload', loadScript);
  // } else {
  //   $window.addEventListener('load', loadScript, false)
  //   //loadScript();
  // }
  loadScript();

  return deferred.promise
});
