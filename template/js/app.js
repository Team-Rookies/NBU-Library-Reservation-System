var app = app || {};

(function getId() {
    if (!app.id) {
        $.getJSON(sessionStorage['events'], function (json) {

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
    }
    attachEvents();
}());

function milToDate(m) {
    return new Date(Number(m));
}
