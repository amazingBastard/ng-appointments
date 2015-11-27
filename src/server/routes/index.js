module.exports = function(app) {
    var jsonfileservice = require('./utils/jsonfileservice')();

    app.get('/api/appointments', getAppointments);

    function getAppointments(req, res, next) {
        var json = jsonfileservice.getJsonFromFile('/../../data/appointments.json');
        json[0].data.results.forEach(function(appointment) {
            var pos = appointment.name.indexOf('(APPOINTMENTS)');
            appointment.name = appointment.name.substr(0, pos - 1);
        });
        res.send(json);
    }
};