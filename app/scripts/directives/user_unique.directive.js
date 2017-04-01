angular.module('app').directive('ngUnique', ['Config', 'UserModel', '$http', function (Config, UserModel, $http) {
  return {
    require: 'ngModel',
    link: function (scope, elem, attrs, ctrl) {
      elem.on('blur', function (evt) {
        scope.$apply(function () {
          UserModel.unique({field:attrs.ngUnique, value:elem.val()}, function(res) {
             ctrl.$setValidity('unique', res.result);
          });
        });
      });
    }
  }
  }
]);
