var grid = grid || {};

$(function () {
    var data;

    $.getJSON('../jsonDB/collectiveEvents.json', function(json) {
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