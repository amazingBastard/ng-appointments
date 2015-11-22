(function() {
    'use strict';

    angular
        .module('app.appointments')
        .controller('Appointments', Appointments);

    Appointments.$inject = ['$q', 'dataservice', 'logger'];

    function Appointments($q, dataservice, logger) {

        /*jshint validthis: true */
        var vm = this;

        vm.appointmentCount = 0;
        vm.appointments = [];
        vm.title = 'Appointments';

        activate();

        function activate() {
            var promises = [getAppointmentCount(), getAppointments()];
//            Using a resolver on all routes or dataservice.ready in every controller
//            return dataservice.ready(promises).then(function(){
            return $q.all(promises).then(function() {
                logger.info('Activated Appointments View');
            });
        }

        function getAppointmentCount() {
            return dataservice.getAppointmentCount().then(function(data) {
                vm.appointmentCount = data;
                return vm.appointmentCount;
            });
        }

        function getAppointments() {
            return dataservice.getAppointments().then(function(data) {
                vm.appointments = data;
                return vm.appointments;
            });
        }
    }
})();
