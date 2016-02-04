var app = app || {};

(function getId() {
    if (!app.id) {
        $.getJSON('events.json', function (json) {

        }).success(function (json) {
            if (json.result.length > 0) {
                app.id = json.result.reverse()[0].id;
            } else {
                app.id = 0;
            }
        }).error(function (error) {
            app.id = 0;
        }).complete(function (status) {
            //console.log(status);
        })
    }
}());

(function ($) {

    "use strict";

    var options = {
        events_source: 'events.json',
        view: 'month',
        tmpl_path: 'tmpls/',
        tmpl_cache: false,
        day: 'now',
        time_start: '08:00',
        time_end: '20:00',
        onAfterEventsLoad: function (events) {
            if (!events) {
                return;
            }
            var list = $('#eventlist');
            list.html('');

            $.each(events, function (key, val) {
                $(document.createElement('li'))
                        .html('<a href="' + val.url + '">' + val.title + '</a>')
                        .appendTo(list);
            });
        },
        onAfterViewLoad: function (view) {
            $('.page-header h3').text(this.getTitle());
            $('.btn-group button').removeClass('active');
            $('button[data-calendar-view="' + view + '"]').addClass('active');
        },
        classes: {
            months: {
                general: 'label'
            }
        }
    };

    var calendar = $('#calendar').calendar(options);

    $('.btn-group button[data-calendar-nav]').each(function () {
        var $this = $(this);
        $this.click(function () {
            calendar.navigate($this.data('calendar-nav'));
        });
    });

    $('.btn-group button[data-calendar-view]').each(function () {
        var $this = $(this);
        $this.click(function () {
            calendar.view($this.data('calendar-view'));
        });
    });

    $('#first_day').change(function () {
        var value = $(this).val();
        value = value.length ? parseInt(value) : null;
        calendar.setOptions({first_day: value});
        calendar.view();
    });

    $('#language').change(function () {
        calendar.setLanguage($(this).val());
        calendar.view();
    });

    $('#events-in-modal').change(function () {
        var val = $(this).is(':checked') ? $(this).val() : null;
        calendar.setOptions({modal: val});
    });
    $('#format-12-hours').change(function () {
        var val = $(this).is(':checked') ? true : false;
        calendar.setOptions({format12: val});
        calendar.view();
    });
    $('#show_wbn').change(function () {
        var val = $(this).is(':checked') ? true : false;
        calendar.setOptions({display_week_numbers: val});
        calendar.view();
    });
    $('#show_wb').change(function () {
        var val = $(this).is(':checked') ? true : false;
        calendar.setOptions({weekbox: val});
        calendar.view();
    });
    $('#events-modal .modal-header, #events-modal .modal-footer').click(function (e) {
        //e.preventDefault();
        //e.stopPropagation();
    });

}(jQuery));

function createEvent(title, description, multimedia, additionalInfo, username, phone, email, eventType, start, end, repeatMethod, repeatDuration) {
    var resultingJSON = [];

    $.getJSON('events.json', function (json) {
        var event = new CalendarEvent(
                title,
                description,
                multimedia,
                additionalInfo,
                username,
                phone,
                email,
                eventType,
                start.getTime(),
                end.getTime()
                );

        json.result.push(event);
        resultingJSON = (json);
        if ((repeatMethod === "week") && (repeatDuration !== 0))
        {
            for (i = 0; i < repeatDuration; i++)
            {
                start.setDate(start.getDate() + 7);
                end.setDate(end.getDate() + 7);

                var event = new CalendarEvent(
                        title,
                        description,
                        multimedia,
                        additionalInfo,
                        username,
                        phone,
                        email,
                        eventType,
                        start.getTime(),
                        end.getTime()
                        );

                json.result.push(event);
                resultingJSON = (json);
            }
        }
        if ((repeatMethod === "month") && (repeatDuration !== 0))
        {
            for (i = 0; i < repeatDuration; i++)
            {
                start.setMonth(start.getMonth() + 1);
                end.setMonth(end.getMonth() + 1);

                var event = new CalendarEvent(
                        title,
                        description,
                        multimedia,
                        additionalInfo,
                        username,
                        phone,
                        email,
                        eventType,
                        start.getTime(),
                        end.getTime()
                        );

                json.result.push(event);
                resultingJSON = (json);
            }
        }

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
}