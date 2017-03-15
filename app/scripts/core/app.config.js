(function() {
    'use strict';

    angular.module('app')
    .factory('appConfig', [appConfig])
    .config(['$httpProvider', mdConfig]);

    // Google Maps SDK Async Loader
    // .config(function(uiGmapGoogleMapApiProvider) {
    //     uiGmapGoogleMapApiProvider.configure({
    //         //    key: 'your api key',
    //         v: '3.20', //defaults to latest 3.X anyhow
    //         // libraries: 'weather,geometry,visualization'
    //     });
    // });

    function appConfig() {
        var pageTransitionOpts = [
            {
                name: 'Fade up',
                "class": 'animate-fade-up'
            }, {
                name: 'Scale up',
                "class": 'ainmate-scale-up'
            }, {
                name: 'Slide in from right',
                "class": 'ainmate-slide-in-right'
            }, {
                name: 'Flip Y',
                "class": 'animate-flip-y'
            }
        ];
        var date = new Date();
        var year = date.getFullYear();
        var main = {
            brand: 'Mastori',
            name: 'Lisa',
            year: year,
            layout: 'boxed',                                 // 'boxed', 'wide'
            menu: 'horizontal',                               // 'horizontal', 'vertical', 'collapsed'
            fixedHeader: true,                              // true, false
            fixedSidebar: true,                             // true, false
            pageTransition: pageTransitionOpts[0],          // 0, 1, 2, 3... and build your own
            skin: '31'                                      // 11,12,13,14,15,16; 21,22,23,24,25,26; 31,32,33,34,35,36
        };
        var color = {
            primary:    '#0198B6',//'#262B33',//'#009688',
            success:    '#8BC34A',
            info:       '#00BCD4',
            infoAlt:    '#7E57C2',
            warning:    '#fcc23b',// '#ea5b48',
            danger:     '#c14e1a', //'#F44336',
            gray:       '#EDF0F1',
            positive:   '#009688',
            negative:   '#db1313',
        };

        return {
            pageTransitionOpts: pageTransitionOpts,
            main: main,
            color: color
        }
    }

    function mdConfig($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
    }

})();
