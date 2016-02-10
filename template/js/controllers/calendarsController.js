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

    CalendarController.prototype.createCalendar = function (name, fileName, path) {
        var defer = Q.defer();
        var saveData = {
            method: 'saveCalendar',
            data: JSON.stringify({
                fileName: fileName,
                name: name
            })
        };

        $.ajax({
            method:'post',
            url: path + 'calendars.php',
            data: saveData,
            success: function (data) {
                sessionStorage['calendarFile'] = JSON.parse(data).fileName;
                sessionStorage['calendarName'] = JSON.parse(data).name;

                defer.resolve();
            },
            error: function (error) {
                defer.reject(JSON.parse(error.responseText).message);
            }
        });

        return defer.promise;
    };


    return new CalendarController();
}());