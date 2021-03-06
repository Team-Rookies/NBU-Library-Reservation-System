var app = app || {};

app.eventsController = (function() {
    function EventsController() {
    }

    EventsController.prototype.addEvent = function(title, department, multimedia, additionalInfo, username, phone, email, start, end, repeatMethod, repeatDuration) {
        var resultingJSON = [], dateOk,
        repeatDuration = Number(repeatDuration);
        dateOk = checkValidDate(start, end, repeatMethod, repeatDuration);
        var deleteUrl;

        if(dateOk) {
            var path = 'jsonDB/';
            $.getJSON(path + sessionStorage['calendarFile'], function (json) {
                deleteUrl = addEvents(title, department, multimedia, additionalInfo, username, phone, email, start, end,
                repeatMethod, repeatDuration, json);

                resultingJSON = json;
            }).then(function () {
                var saveData = {
                    method: 'saveEvent',
                    file: sessionStorage['calendarFile'],
                    json: JSON.stringify(resultingJSON),
                    email: email,
                    deleteUrl: deleteUrl,
                    username: username
                };
                $.post('api/events.php', saveData, function (response) {
                    $.parseHTML(response);
                }).success(function (data) {
                    var mod = $('#AddFormModal');
                    mod.modal('hide');
                    mod.on('hidden.bs.modal', function () {
                        $(this).find('form').trigger('reset');
                    });
                    app.options.events_source = app.calendarController.refreshSource();
                    $('#hallName').text(sessionStorage['calendarName']);
                    $('#calendar').calendar(app.options);
                }).error(function (error) {
                    console.log(error);
                }).complete(function (status) {

                });
            });
        } else {
            console.error('Event already exists');
        }
    };

    function checkValidDate(start, end, method, duration) {
        duration = duration || 1;
        for (var i = 0; i < duration; i++) {
            var newStart = new Date(start.getTime());
            var newEnd = new Date(end.getTime());
            if(method === 'week') {
                newStart.setDate(start.getDate() + 7 * i);
                newEnd.setDate(end.getDate() + 7 * i);
            } else {
                newStart.setMonth(start.getMonth() + i);
                newEnd.setMonth(end.getMonth() + i);
            }
            var checkDateRange = new DateRange(newStart, newEnd);
            if(app.dates.contains(checkDateRange)) {
                return false;
            }
        }
        return true;
    }

    function addEvents(title, department, multimedia, additionalInfo, username, phone, email, start, end, method, duration, json) {
        var event;
        var id = (new Date()).getTime() + app.id;
        var deleteURL = document.URL.substr(0,document.URL.lastIndexOf('/')) + '/api/events.php?event='+sessionStorage['calendarFile']+'&id=' + id;

        if(duration !== 0) {
            for (var i = 0; i < duration; i++) {
                var newStart = new Date(start.getTime());
                var newEnd = new Date(end.getTime());
                if (method === "week") {
                    newStart.setDate(start.getDate() + 7 * i);
                    newEnd.setDate(end.getDate() + 7 * i);
                } else if (method === 'month') {
                    newStart.setMonth(start.getMonth() + i);
                    newEnd.setMonth(end.getMonth() + i);
                }

                event = new CalendarEvent(
                    title,
                    department,
                    multimedia,
                    additionalInfo,
                    username,
                    phone,
                    email,
                    newStart.getTime(),
                    newEnd.getTime(),
                    id
                );

                json.result.push(event);
            }
        } else {
            event = new CalendarEvent(
                title,
                department,
                multimedia,
                additionalInfo,
                username,
                phone,
                email,
                start.getTime(),
                end.getTime(),
                id
            );

            json.result.push(event);
        }

        return deleteURL;
    }

    return new EventsController();
}());