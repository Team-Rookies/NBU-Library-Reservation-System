function attachEvents() {

    $('#addBtn').click(function () {
        $("#addForm").validationEngine();
        var valid = $("#addForm").validationEngine('validate');
        if (valid === true)
        {
            var title = $('#title').val(),
                    department = $('#dep').val(),
                    multimedia = $('#multimedia').prop('checked'),
                    additionalInfo = $('#additionalInfo').val(),
                    username = $('#username').val(),
                    phone = $('#phone').val(),
                    mail = $('#mail').val(),
                    dateStart = $('#dateStart').val(),
                    dateEnd = $('#dateEnd').val(),
                    timeStart = $('#timeStart').val(),
                    timeEnd = $('#timeEnd').val(),
                    repeatMethod = $('#selectMethod')[0].value,
                    repeatDuration = $('#selectDuration')[0].value;
            var startDate = new Date(dateStart + "T" + timeStart + ":00+0200");
            var endDate = new Date(dateEnd + "T" + timeEnd + ":00+0200");
            app.eventsController.addEvent(title, department, multimedia, additionalInfo, username, phone, mail, startDate, endDate, repeatMethod, repeatDuration);
        }
    });

    $('#deleteBtn').click(function () {
        var url = $('#deleteBtn').attr("edata");
        var saveData = {
            method: 'deleteEvent',
            file: sessionStorage['calendarFile'],
            url: url
        };

        $.post('api/events.php', saveData, function (response) {

        }).success(function (data) {

        }).error(function (error) {
            console.log(error);
        }).complete(function (status) {
            setTimeout(function() {
                window.location.replace("./events.html");
            }, 1000)
        });
        return false;
    });

    $('#timeStart').on('change', function() {
        if($(this).val() != '') {
            $('#timeEnd').removeAttr('disabled');
        } else {
            $('#timeEnd').attr('disabled', 'disabled');
        }
    });

    $('#datepair .time').on('focus', function () {
        var date = new Date($('#dateStart').val());
        if (app.dates.containsDate(date)) {
            var arr = [];
            app.dates.toArray().forEach(function (e) {
                var dt = [];
                dt.push(formatAMPM(e.startTime));
                dt.push(formatAMPM(e.endTime));
                arr.push(dt);
            });

            $(this).timepicker('option', 'disableTimeRanges', arr);
        } else {
            $(this).timepicker('option', 'disableTimeRanges', []);
        }
    });

    $('#halls').on('change', function() {
        var _this = this;
        app.calendarController.getCalendarByFileName(this.value)
            .then(function(name) {
                sessionStorage['calendarName'] = name;
                sessionStorage['calendarFile'] = _this.value;
            })
            .done(function() {
                window.location.reload();
            })
    });

    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + '' + ampm;
        return strTime;
    }
}