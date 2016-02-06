$('#addBtn').click(function() {
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
    var startDate = new Date(dateStart + "T"  + timeStart + ":00+0200");
    var endDate = new Date(dateEnd + "T"  + timeEnd + ":00+0200");

    debugger;
    app.eventsController.addEvent(title, department, multimedia, additionalInfo, username, phone, mail, startDate, endDate, repeatMethod, repeatDuration);
});