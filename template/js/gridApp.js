var grid = grid || {};

$(function () {
    $.getJSON('../jsonDB/calendars.json', function(json) {
        if(json) {
            if(!sessionStorage['calendarFile']) {
                sessionStorage['calendarFile'] = calendars[0].fileName;
                sessionStorage['calendarName'] = calendars[0].name;
            }
            $('#hallName').text(sessionStorage['calendarName']);
            grid.calendars = json.calendars;
            grid.calendars.forEach(function(c) {
                $('<option/>').attr({value: c.fileName}).text(c.name).appendTo('#halls');
            });
            eventHandlers();
        } else {
            throw new Error('Error loading calendars');
        }
    }).complete(function(e) {
        $('#halls').selectpicker({
            style:'btn-info'
        });
    });

    $('#halls').on('change', function() {
        var data;
        var fileName = '../jsonDB/' + this.value;

        $.getJSON(fileName, function(json) {
            data = json.result;
        }).then(function() {
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
                    {name: "id", type: "text", title:"Id", width:50, sorting: true},
                    {name: "title", type: "textarea", width: 150, title:'Title', sorting: true},
                    {name: 'department', type: 'textarea', width: 150, title:'Department', sorting: true},
                    {name: 'multimedia', type: "checkbox", title: "Needs multimedia", sorting: true },
                    {name: 'additionalInfo', type: 'textarea', width: 150, title:'Additional Information',sorting: false},
                    {name: 'deleteUrl', type:'repeated', title:'Delete Link Id'},
                    {type:'control'}
                ]
            });
        });
    });

});

function eventHandlers() {

}