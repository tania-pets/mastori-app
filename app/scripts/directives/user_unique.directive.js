angular.module('app').directive('ngUnique', ['Config', 'UserModel', '$http', 'AuthService',
  function (Config, UserModel, $http, AuthService) {
    return {
      require: 'ngModel',
      link: function (scope, elem, attrs, ctrl) {
        elem.on('blur', function (evt) {
          scope.$apply(function () {
            debugger;
            UserModel.unique({field:attrs.ngUnique, value:elem.val(), user: AuthService.user() ? AuthService.user().id : null}, function(res) {
               ctrl.$setValidity('unique', res.result);
            });
          });
        });
      }
    }
  }
]);
