var app = app || {};

app.calendarController = (function() {
    function CalendarController() {

    }

    CalendarController.prototype.getCalendarEventsByCalendarName = function(name) {

    };

    CalendarController.prototype.createCalendar = function (name) {
        var saveData = {
            method: 'saveCalendar',
            name: name
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