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
}