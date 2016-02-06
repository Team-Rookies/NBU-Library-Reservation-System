var app = app || {};

app.eventsController = (function() {
    function EventsController() {
    }

    EventsController.prototype.addEvent = function(title, department, multimedia, additionalInfo, username, phone, email, start, end, repeatMethod, repeatDuration) {
        var resultingJSON = [], i, event, checkDateRange, dateOk = true;
        var newStart = new Date(start.getTime());
        var newEnd = new Date(end.getTime());
        repeatDuration = Number(repeatDuration);

        if ((repeatMethod === "week") && (repeatDuration !== 0)) {
            for (i = 0; i < repeatDuration; i++) {
                newStart.setDate(start.getDate() + 7 * i);
                newEnd.setDate(end.getDate() + 7 * i);
                checkDateRange = new DateRange(newStart, newEnd);
                if(app.dates.contains(checkDateRange)) {
                    dateOk = false;
                    break;
                }
            }
        } else if((repeatMethod === "month") && (repeatDuration !== 0)) {
            for (i = 0; i < repeatDuration; i++) {
                newStart.setMonth(start.getMonth() + i);
                newEnd.setMonth(end.getMonth() + 1);
                checkDateRange = new DateRange(newStart, newEnd);

                if(!app.dates.contains(checkDateRange)) {
                    dateOk = false;
                    break;
                }
            }
        }

        if(dateOk) {
            $.getJSON('events.json', function (json) {
                if ((repeatMethod === "week") && (repeatDuration !== 0)) {
                    for (i = 0; i < repeatDuration; i++) {
                        newStart = new Date(start.getTime());
                        newEnd = new Date(end.getTime());
                        newStart.setDate(start.getDate() + 7 * i);
                        newEnd.setDate(end.getDate() + 7 * i);

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
                } else if ((repeatMethod === "month") && (repeatDuration !== 0)) {
                    for (i = 0; i < repeatDuration; i++) {
                        newStart = new Date(start.getTime());
                        newEnd = new Date(end.getTime());
                        newStart.setMonth(start.getMonth() + i);
                        newEnd.setMonth(end.getMonth() + i);

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

    return new EventsController();
}());