(function () {
    'use strict';

    angular.module('app')
        .directive('toString', [toString]);

    function toString() {
        return {
            restrict: 'E',
            scope: {
                values: "=",
                class: "@class",
                key: "@",
            },
            template:
            '<span class="text-muted m-r-xs {{class}}" ng-repeat="value in values | orderBy:key">'+
              '{{ value[key] }}' +
              '<span ng-if="$index < values.length-1">,</span>' +
            '</span>'
        };
    }
})();
