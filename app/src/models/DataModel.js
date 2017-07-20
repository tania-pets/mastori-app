angular.module('app')
.factory( 'DataModel', function($resource, Config) {
  return function( url, params, methods ) {
    var defaults = {
      update: { method: 'put', isArray: false },
      create: { method: 'post',isArray: false }
    };

    methods = angular.extend( defaults, methods );
    var resource = $resource( Config.api.url +url, params, methods );

    resource.prototype.$save = function(success, failure) {
      if (!this.id) {
        return this.$create(success, failure);
      } else {
        return this.$update(success, failure);
      }
    };

    resource.$delete = function(params, cb){
      return this.delete(params, success, failure);
    };

    return resource;
  };
});
