(function() {
    'use strict';

    angular
        .module('app.appointments')
        .controller('Appointments', Appointments);

    Appointments.$inject = ['$q', 'dataservice', 'logger'];

    function Appointments($q, dataservice, logger) {

        /*jshint validthis: true */
        var vm = this;

        vm.appointmentsCount = 0;
        vm.appointments = [];
        vm.title = 'Appointments';

        activate();

        function activate() {
            var promises = [getAppointmentsCount(), getAppointmentClients()];
//            Using a resolver on all routes or dataservice.ready in every controller
//            return dataservice.ready(promises).then(function(){
            return $q.all(promises).then(function() {
                logger.info('Activated Appointments View');
            });
        }

        function getAppointmentsCount() {
            return dataservice.getAppointmentsCount().then(function(data) {
                vm.appointmentsCount = data;
                return vm.appointmentsCount;
            });
        }

        function getAppointmentClients() {
            return dataservice.getAppointmentClients().then(function(data) {
                vm.appointments = data;
                return vm.appointments;
            });
        }
    }
})();