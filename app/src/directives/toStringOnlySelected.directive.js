(function () {
    'use strict';

    angular.module('app')
        .directive('toStringOnlySelected', [toStringOnlySelected]);

    function toStringOnlySelected() {
        return {
            restrict: 'E',
            scope: {
                values: "=",
                selectedval: "=",
                key: "@",
            },
            template:
            '<span class="m-r-xs" ng-repeat="value in values | orderBy:key | myFilter:selectedval as filtered">'+
              '{{ value[key] }}' +
              '<span ng-if="$index < filtered.length-1">,</span>' +
            '</span>'
        };
    }
})();
