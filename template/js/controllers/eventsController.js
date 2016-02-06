var app = app || {};

app.eventsController = (function() {
    function EventsController() {
    }

    EventsController.prototype.addEvent = function(title, department, multimedia, additionalInfo, username, phone, email, start, end, repeatMethod, repeatDuration) {
        var resultingJSON = [], dateOk = true;
        repeatDuration = Number(repeatDuration);
        dateOk = checkValidDate(start, end, repeatMethod, repeatDuration);

        if(dateOk) {
            $.getJSON('events.json', function (json) {
                addEvents(title, department, multimedia, additionalInfo, username, phone, email, start, end,
                repeatMethod, repeatDuration, json);

                resultingJSON = json;
            }).then(function () {
                var saveData = {
                    method: 'saveEvent',
                    json: JSON.stringify(resultingJSON)
                };
                $.post('api/events.php', saveData, function (response) {
                    $.parseHTML(response);
                }).success(function (data) {
                    if (data === 'success') {
                        window.location.replace("./index-bs3.html");
                        //console.log(data);
                    }
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
        var newStart = new Date(start.getTime());
        var newEnd = new Date(end.getTime());

        for (var i = 0; i < duration; i++) {
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

        if(duration !== 0) {
            var newStart = new Date(start.getTime());
            var newEnd = new Date(end.getTime());
            for (var i = 0; i < duration; i++) {
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
                    newEnd.getTime()
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
                end.getTime()
            );

            json.result.push(event);
        }
    }

    return new EventsController();
}());