function attachEvents() {
    $('#addBtn').click(function () {
        /*
         $title = filter_input(INPUT_POST, 'title');
         $dep = filter_input(INPUT_POST, 'dep');
         $additionalInfo = filter_input(INPUT_POST, 'additionalInfo');
         $username = filter_input(INPUT_POST, 'username');
         $phone = filter_input(INPUT_POST, 'phone');
         $mail = filter_input(INPUT_POST, 'mail');
         $dateStart = filter_input(INPUT_POST, 'dateStart');
         $dateEnd = filter_input(INPUT_POST, 'dateEnd');
         $timeStart = filter_input(INPUT_POST, 'timeStart');
         $timeEnd = filter_input(INPUT_POST, 'timeEnd');
         $repeatMethod =  filter_input(INPUT_POST, 'selectMethod');
         if (isset($_POST['selectDuration'])){
         $repeatDuration= filter_input(INPUT_POST, 'selectDuration');
         } else {
         $repeatDuration = 0;
         }
         */
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

        debugger;
        app.eventsController.addEvent(title, department, multimedia, additionalInfo, username, phone, mail, startDate, endDate, repeatMethod, repeatDuration);
    });

    $('#deleteBtn').click(function () {
        var url = $('#deleteBtn').attr("edata");
        var saveData = {
            method: 'deleteEvent',
            url: url
        };

        $.post('api/events.php', saveData, function (response) {
            $.parseHTML(response);
        }).success(function (data) {
            if (data === 'success') {
                window.location.replace("./index-bs3.html");
            }else {
                console.log(data);
            }
        }).error(function (error) {
            console.log(error);
        }).complete(function (status) {

        });
        return false;
    });

    $('#timeStart').focus(function() {
        var date = new Date($('#dateStart').val());
        if(app.dates.containsDate(date)) {
            var arr = [];
            app.dates.toArray().forEach(function(e) {
                var dt = [];
                dt.push(formatAMPM(e.startTime));
                dt.push(formatAMPM(e.endTime));
                arr.push(dt);
            });

            $('#timeStart').timepicker({
                'showDuration': true,
                'timeFormat': 'H:i',
                'minTime': '08:00',
                'maxTime': '20:00',
                'disableTextInput': true,
                'disableTimeRanges': arr
            })
        }
    });

    $('#timeEnd').focus(function() {
        var date = new Date($('#dateStart').val());
        if(app.dates.containsDate(date)) {
            var arr = [];
            app.dates.toArray().forEach(function(e) {
                var dt = [];
                dt.push(formatAMPM(e.startTime));
                dt.push(formatAMPM(e.endTime));
                arr.push(dt);
            });

            $('#timeEnd').timepicker({
                'showDuration': true,
                'timeFormat': 'H:i',
                'minTime': '08:00',
                'maxTime': '20:00',
                'disableTextInput': true,
                'disableTimeRanges': arr
            })
        }
    });


    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + '' + ampm;
        return strTime;
    }
}