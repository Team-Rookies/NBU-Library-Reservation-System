var CalendarEvent = (function() {
    function CalendarEvent(title, eventClass, start, end, url) {
        this.id = (++app.id).toString();
        this.title = title;
        this.url = url;
        this.class = eventClass;
        this.start = start.toString();
        this.end = end.toString();
    }

    return CalendarEvent;
}());