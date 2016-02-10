var app = app || {};

$(document).ready(function () {


    if (!app.id) {
        if(sessionStorage['calendarFile']) {
            var path = 'jsonDB/';
            $.getJSON(path + sessionStorage['calendarFile'], function (json) {

            }).success(function (json) {
                app.dates = new BinarySearchTree();
                if (json.result.length > 0) {
                    app.id = json.result.reverse()[0].id;
                    for (var key in json.result) {
                        var range = new DateRange(milToDate(json.result[key].start), milToDate(json.result[key].end));
                        app.dates.add(range);
                    }

                } else {
                    app.id = 0;
                }
            }).error(function (error) {
                app.id = 0;
            }).complete(function (status) {
                //console.log(status);
            })
        } else {

        }
    }
    attachEvents();
});



function milToDate(m) {
    return new Date(Number(m));
}

(function() {
    $('#datepair .time').timepicker({
        'showDuration': true,
        'timeFormat': 'H:i',
        'minTime': '08:00',
        'maxTime': '20:00',
        'disableTextInput': true
    });

    $('#timeEnd').attr('disabled', 'disabled');


    $('#datepair .date').datepicker({
        'format': 'yyyy-mm-dd',
        'autoclose': true,
        'startDate': '+0d'
    });

    $('#datepair').datepair({
        'defaultTimeDelta': 1800000
    });

//Reset button form
    $('#clearBtn').click(function () {
        document.getElementById("addForm").reset();
        document.getElementById("selectDuration").disabled = true;
    });

// Repeat fields dependency
    $(function () {

        var $cat = $("#selectMethod"),
            $subcat = $("#selectDuration");

        $cat.on("change", function () {
            var _rel = $(this).val();
            $subcat.find("option").attr("style", "");
            $subcat.val("");
            if (!_rel)
                return $subcat.prop("disabled", true);
            $subcat.find("[rel=" + _rel + "]").show();
            $subcat.prop("disabled", false);
        });

    });
}());