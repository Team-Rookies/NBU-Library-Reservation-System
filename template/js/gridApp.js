var grid = grid || {};

(function () {
    app.adminController.checkSession('../jsonDB/')
        .then(function(success) {
            $.getJSON('../jsonDB/calendars.json', function (json) {
                if (json.calendars) {
                    if (!sessionStorage['calendarFile']) {
                        sessionStorage['calendarFile'] = json.calendars[0].fileName;
                        sessionStorage['calendarName'] = json.calendars[0].name;
                    }
                    $('#hallName').text(sessionStorage['calendarName']);
                    grid.calendars = json.calendars;
                    grid.calendars.forEach(function (c) {
                        $('<option/>').attr({value: c.fileName}).text(c.name).appendTo('#halls');
                    });
                } else {
                    throw new Error('Error loading calendars');
                }
            }).complete(function (e) {
                $('#halls').selectpicker({
                    style: 'btn-info'
                });
            });

            addHallHandlers();

            $('#halls').on('change', function () {
                var data;
                grid.fileName = '../jsonDB/' + this.value;

                $.getJSON(grid.fileName, function (json) {
                    data = json.result;
                }).then(function () {
                    grid.data = data;
                    $("#jsGrid").jsGrid({
                        theme: 'classic',
                        height: "auto",
                        width: "100%",
                        sorting: true,
                        paging: true,
                        autoload: true,
                        controller: grid.gridController,
                        fields: [
                            {name: "id", type: "text", title: "Id", width: 50, sorting: true},
                            {name: "title", type: "textarea", width: 150, title: 'Title', sorting: true},
                            {name: 'department', type: 'textarea', width: 150, title: 'Department', sorting: true},
                            {name: 'multimedia', type: "checkbox", title: "Needs multimedia", sorting: true},
                            {name: 'username', type: "text", title: "Name", sorting: true},
                            {name: 'phone', type: "text", title: "Telephone", sorting: true},
                            {name: 'start', type: 'customDate', title: 'Start date', sorting: true},
                            {name: 'end', type: 'customDate', title: 'End date', sorting: true},
                            {name: 'email', type: "text", title: "Email", sorting: true},
                            {
                                name: 'additionalInfo',
                                type: 'textarea',
                                width: 150,
                                title: 'Additional Information',
                                sorting: false
                            },
                            {name: 'deleteUrl', type: 'repeated', title: 'Delete Link Id'},
                            {type: 'control'}
                        ]
                    });
                    $('#print').jsButton();
                    eventHandlers();
                });
            });
    }, function(error) {
            window.location.replace('login.html');
    });
}());

function eventHandlers() {
    $('#addHallBtn').on('click', function() {
        console.log('it works')
    });

    $('.jsgrid-delete-button').on('click', function() {
        window.location.reload();
    });
}

function addHallHandlers() {
    $('#addBtn').on('click', function() {
        var calName = $('#title').val();
        var fileName = $('#fileName').val();
        app.calendarController.createCalendar(calName, fileName, '../api/')
            .then(function(success) {
                window.location.reload();
            }, function(error) {
                console.error(error);
            })
    })
}