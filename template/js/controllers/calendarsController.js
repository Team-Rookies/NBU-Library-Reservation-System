var app = app || {};

app.calendarController = (function() {
    function CalendarController() {
    }

    CalendarController.prototype.refreshSource = function() {
        return 'jsonDB/' + sessionStorage['calendarFile'];
    };

    CalendarController.prototype.getCalendarByFileName = function(fname) {
        var calendarName = Q.defer();
        $.getJSON('jsonDB/calendars.json', function(json) {
            json.calendars.forEach(function(c) {
                if(c.fileName === fname) {
                    calendarName.resolve(c.name);
                }
            })
        });
        return calendarName.promise;
    };

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
                sessionStorage['calendarFile'] = JSON.parse(data).fileName;
                sessionStorage['calendarName'] = JSON.parse(data).name;

                app.options.events_source = app.calendarController.refreshSource();
                $('#hallName').text(sessionStorage['calendarName']);
                $('#calendar').calendar(app.options);
            },
            error: function (error) {
                console.log('Error: ' + JSON.parse(error.responseText).message);
            }
        })
    };


    return new CalendarController();
}());