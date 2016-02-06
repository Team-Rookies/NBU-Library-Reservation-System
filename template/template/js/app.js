var app = app || {};

(function getId(){
    if(!app.id) {
        $.getJSON('events.json', function (json) {

        }).success(function(json) {
            if(json.result.length > 0) {
                app.id = json.result.reverse()[0].id;
                app.dates = new BinarySearchTree();
                for (var key in json.result) {
                    var range = new DateRange(milToDate(json.result[key].start), milToDate(json.result[key].end));
                    app.dates.add(range);
                }
                    console.log(app.dates.contains(app.dates.toArray()[2]))
            } else {
                app.id = 0;
            }
        }).error(function(error) {
            app.id = 0;
        }).complete(function(status) {
            //console.log(status);
        })
    }
}());

function milToDate(m) {
    return new Date(Number(m));
}

function checkValidDate(date) {

}
