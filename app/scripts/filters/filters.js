//abs filter
angular.module('app').filter('abs', function () {
  return function(val) {
    return Math.abs(val);
  }
});


// matcher filter
angular.module('app').filter('matcher', function() {
  return function(arr1, arr2, property1 = 'id', property2 = 'id') {
    var array2Ids = []
    angular.forEach(arr2, function(value, index) {
      array2Ids.push(value[property2]);
    })
    return arr1.filter(function(val) {
      return array2Ids.indexOf(val[property1]) !== -1;
    })
  }
});