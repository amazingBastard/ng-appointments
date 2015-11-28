(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    /* @ngInject */
    function dataservice($http, $location, $q, exception, logger, moment) {
        var isPrimed = false;
        var primePromise;

        var service = {
            generateAppointments: generateAppointments,
            getAppointmentsCount: getAppointmentsCount,
            getAppointments: getAppointments,
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
            return generateAppointments()
                .then(getAppointmentsComplete)
                .catch(exception.catcher('XHR Failed for getAppointmentsCount'));

            function getAppointmentsComplete (data) {
                count = data.length;
                return $q.when(count);
            }
        }

        function generateAppointments() {
            var appointments = [
                {
                    id: '4a6d6b81-0cf7-48e5-9251-1d243e20d9f0',
                    title: 'Chris Canning\'s Blowout',
                    client: 'Chris Canning',
                    service: 'BLOWOUT',
                    address: {
                        street: '123 Fake Street',
                        city: 'New York',
                        state: 'NY',
                        zip: '11001'
                    },
                    type: 'info',
                    vip: true,
                    startsAt: moment().subtract(2, 'day').toDate(),
                    isCancelled: false,
                    draggable: true,
                    resizable: true
                },
                {
                    id: '4a6d6b81-0cf7-48e5-9251-1d243e20d9f9',
                    title: 'Makeover for Christina Ray',
                    client: 'Christina Ray',
                    service: 'MAKEUP W/LASHES',
                    address: {
                        street: '456 Fake Street',
                        city: 'New York',
                        state: 'NY',
                        zip: '11011'
                    },
                    type: 'warning',
                    vip: false,
                    startsAt: moment().subtract(1, 'day').toDate(),
                    isCancelled: false,
                    draggable: true,
                    resizable: true
                }
            ];
            return $q.when(appointments);
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