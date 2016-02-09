var app = app || {};

app.calendarController = (function() {
    function CalendarController() {
    }

    CalendarController.prototype.getCalendars = function() {
        var defer = Q.defer();
        $.getJSON('jsonDB/calendars.json', function(json) {
            if(json) {
                defer.resolve(json.calendars);
            } else {
                defer.reject();
            }
        });

        return defer.promise;
    };

    CalendarController.prototype.createCalendar = function (name, fileName) {
        var saveData = {
            method: 'saveCalendar',
            data: JSON.stringify({
                fileName: fileName,
                name: name
            })
        };

        $.ajax({
            method:'post',
            url: 'api/calendars.php',
            data: saveData,
            success: function (data) {
                sessionStorage['events'] = JSON.parse(data).status;

                setTimeout(function() {
                    window.location.replace("./events.html");
                }, 1000);
            },
            error: function (error) {
                console.log('Error: ' + JSON.parse(error.responseText).message);
            }
        }).done();
    };


    return new CalendarController();
}());