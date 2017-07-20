(function() {
    'use strict';

    angular.module('core.config', [])
    .factory('appConfig', [appConfig])
    .config(['$mdThemingProvider', '$httpProvider', '$mdDateLocaleProvider', '$breadcrumbProvider', mdConfig]);

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
            layout: 'full',                                 // 'boxed', 'wide'
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

    function mdConfig($mdThemingProvider, $httpProvider, $mdDateLocaleProvider, $breadcrumbProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');

        var cyanAlt = $mdThemingProvider.extendPalette('cyan', {
            'contrastLightColors': '500 600 700 800 900',
            'contrastStrongLightColors': '500 600 700 800 900'
        })
        var lightGreenAlt = $mdThemingProvider.extendPalette('light-green', {
            'contrastLightColors': '500 600 700 800 900',
            'contrastStrongLightColors': '500 600 700 800 900'
        })

        $mdThemingProvider
            .definePalette('cyanAlt', cyanAlt)
            .definePalette('lightGreenAlt', lightGreenAlt);



            $mdThemingProvider.definePalette('black', {
          '50': '#a6aebc',
          '100': '#7a879c',
          '200': '#5f6b7f',
          '300': '#404956',
          '400': '#333a45',
          '500': '#0198B6',
          '600': '#191c21',
          '700': '#0c0d10',
          '800': '#000000',
          '900': '#000000',
          'A100': '#a6aebc',
          'A200': '#7a879c',
          'A400': '#333a45',
          'A700': '#0c0d10',
          'contrastDefaultColor': 'light',
          'contrastDarkColors': '50 100 A100 A200'
        });
        $mdThemingProvider.theme('default')
            .primaryPalette('black', {
                'default': '500'
            })
            .accentPalette('grey', {
                'default': '500'
            })
            .warnPalette('red', {
                'default': '500'
            })
            .backgroundPalette('grey');

            //for md-datepicker
            $mdDateLocaleProvider.months = ['Ιανουάριος','Φεβρουάριος','Μάρτιος','Απρίλιος','Μάιος','Ιούνιος','Ιούλιος','Αύγουστος','Σεπτέμβριος','Οκτώβριος','Νοέμβριος','Δεκέμβριος'];
            $mdDateLocaleProvider.shortMonths = ['Ιαν','Φεβ','Μαρ','Απρ','Μαϊ','Ιουν','Ιουλ','Αυγ','Σεπ','Οκτ','Νοε','Δεκ'];

            $breadcrumbProvider.setOptions({
                templateUrl: 'views/partials/breadcrumb.html'
              });

    }

})();
