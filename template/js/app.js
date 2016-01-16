var app = app || {};

(function getId(){
    if(!app.id) {
        $.getJSON('events.json', function (json) {

        }).success(function(json) {
            if(json.result.length > 0) {
                app.id = json.result.reverse()[0].id;
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

(function($) {

	"use strict";

	var options = {
		events_source: 'events.json',
		view: 'month',
		tmpl_path: 'tmpls/',
		tmpl_cache: false,
		day: '2016-01-01',
		onAfterEventsLoad: function(events) {
			if(!events) {
				return;
			}
			var list = $('#eventlist');
			list.html('');

			$.each(events, function(key, val) {
				$(document.createElement('li'))
					.html('<a href="' + val.url + '">' + val.title + '</a>')
					.appendTo(list);
			});
		},
		onAfterViewLoad: function(view) {
			$('.page-header h3').text(this.getTitle());
			$('.btn-group button').removeClass('active');
			$('button[data-calendar-view="' + view + '"]').addClass('active');
		},
		classes: {
			months: {
				general: 'label'
			}
		}
	};

	var calendar = $('#calendar').calendar(options);

	$('.btn-group button[data-calendar-nav]').each(function() {
		var $this = $(this);
		$this.click(function() {
			calendar.navigate($this.data('calendar-nav'));
		});
	});

	$('.btn-group button[data-calendar-view]').each(function() {
		var $this = $(this);
		$this.click(function() {
			calendar.view($this.data('calendar-view'));
		});
	});

	$('#first_day').change(function(){
		var value = $(this).val();
		value = value.length ? parseInt(value) : null;
		calendar.setOptions({first_day: value});
		calendar.view();
	});

	$('#language').change(function(){
		calendar.setLanguage($(this).val());
		calendar.view();
	});

	$('#events-in-modal').change(function(){
		var val = $(this).is(':checked') ? $(this).val() : null;
		calendar.setOptions({modal: val});
	});
	$('#format-12-hours').change(function(){
		var val = $(this).is(':checked') ? true : false;
		calendar.setOptions({format12: val});
		calendar.view();
	});
	$('#show_wbn').change(function(){
		var val = $(this).is(':checked') ? true : false;
		calendar.setOptions({display_week_numbers: val});
		calendar.view();
	});
	$('#show_wb').change(function(){
		var val = $(this).is(':checked') ? true : false;
		calendar.setOptions({weekbox: val});
		calendar.view();
	});
	$('#events-modal .modal-header, #events-modal .modal-footer').click(function(e){
		//e.preventDefault();
		//e.stopPropagation();
	});

}(jQuery));

function createEvent(title, eventClass, start, end, url) {
    var resultingJSON;
    $.getJSON('events.json', function(json) {

        var event = new CalendarEvent(title, eventClass, start.getTime(), end.getTime(), url);

        json.result.push(event);

        resultingJSON = json;
    }).then(function() {
        var saveData = {
            method : 'saveEvent',
            json : JSON.stringify(resultingJSON)
        };

        $.post('api/events.php',saveData, function(response) {
            $.parseHTML(response);
        }).success(function(data) {
            if(data === 'success') {
                window.location.reload();
            }
        }).error(function(error) {
            console.log(error);
        }).complete(function(status) {

        });
    });
}