(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    /* @ngInject */
    function dataservice($http, $location, $q, exception, logger) {
        var isPrimed = false;
        var primePromise;

        var service = {
            getAppointmentClients: getAppointmentClients,
            getAppointmentServices: getAppointmentServices,
            getAppointmentDates: getAppointmentDates,
            getAppointmentStatus: getAppointmentStatus,
            getAppointmentsCount: getAppointmentsCount,
            getAppointments: getAvengers,
            ready: ready
        };

        return service;

        function getAppointments() {
            return $http.get('/api/appointments')
                .then(getAppointmentsComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed for getAppointments')(message);
                    $location.url('/');
                });

            function getAppointmentsComplete(data, status, headers, config) {
                return data.data[0].data.results;
            }
        }

        function getAppointmentsCount() {
            var count = 0;
            return getAppointmentClients()
                .then(getAppointmentClientsComplete)
                .catch(exception.catcher('XHR Failed for getAppointmentsCount'));

            function getAppointmentClientsComplete (data) {
                count = data.length;
                return $q.when(count);
            }
        }

        function getAppointmentClients() {
            var clients = [
                {name: 'Glamsquad1 Client', id: '4a6d6b81-0cf7-48e5-9251-1d243e20d9f0'},
                {name: 'Glamsquad2 Client', id: '4a6d6b81-0cf7-48e5-9251-1d243e20d9f9'}
            ];
            return $q.when(clients);
        }

        function getAppointmentServices() {
            var services = [
                {name: 'BLOWOUT', id: '185ee8bd-b58c-4b66-91bb-eeea98b3db22'},
                {name: 'MAKEUP W/LASHES', id: '185ee8bd-b58c-4b66-91bb-eeea98b3db23'}
            ];
            return $q.when(services);
        }

        function getAppointmentDates() {
            var dates = [
                {startDateTime: 1446123600, id: '320aa6a8-0457-4d03-a4f6-f3f11980ec13'},
                {startDateTime: 1446134400, id: '320aa6a8-0457-4d03-a4f6-f3f11980ec12'}
            ];
            return $q.when(dates);
        }

        function getAppointmentStatus() {
            var status = [
                {isCanceled: false, id: '320aa6a8-0457-4d03-a4f6-f3f11980ec13'},
                {isCanceled: true, id: '320aa6a8-0457-4d03-a4f6-f3f11980ec12'}
            ];
            return $q.when(status);
        }

        function prime() {
            // This function can only be called once.
            if (primePromise) {
                return primePromise;
            }

            primePromise = $q.when(true).then(success);
            return primePromise;

            function success() {
                isPrimed = true;
                logger.info('Primed data');
            }
        }

        function ready(nextPromises) {
            var readyPromise = primePromise || prime();

            return readyPromise
                .then(function() { return $q.all(nextPromises); })
                .catch(exception.catcher('"ready" function failed'));
        }

    }
})();