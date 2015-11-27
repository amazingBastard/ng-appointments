(function() {
    'use strict';

    angular.module('app.core', [
        /*
         * Angular modules
         */
        'ngAnimate', 'ngRoute', 'ngSanitize',
        /*
         * Our reusable cross app code modules
         */
        'helpers.exception', 'helpers.logger', 'helpers.router',
        /*
         * 3rd Party modules
         */
        'angular.less'
    ]);
})();