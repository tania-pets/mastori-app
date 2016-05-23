//abs filter
angular.module('app').filter('abs', function () {
  return function(val) {
    return Math.abs(val);
  }
});
