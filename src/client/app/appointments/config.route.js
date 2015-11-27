(function() {
    'use strict';

    angular
        .module('app.appointments')
        .run(appRun);

    // appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/',
                config: {
                    templateUrl: 'app/appointments/appointments.html',
                    controller: 'Appointments',
                    controllerAs: 'vm',
                    title: 'appointments',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-calendar"></i> Appointments'
                    }
                }
            }
        ];
    }
})();