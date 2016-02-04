var CalendarEvent = (function () {
    function CalendarEvent(title, description, multimedia, additionalInfo, username, phone, email, eventType, start, end) {
        this.id = (++app.id).toString();
        this.title = title;
        this.description = description;
        this.multimedia = multimedia ? true : false;
        this.additionalInfo = additionalInfo;
        this.username = username;
        this.phone = phone;
        this.email = email;
        this.class = eventType;
        this.start = start.toString();
        this.end = end.toString();
        this.deleteUrl = this.createDeleteUrl();
    }

    CalendarEvent.prototype.createDeleteUrl = function () {
        //var root = location.protocol + '/' + location.host + location.pathname;
        return (new Date()).getTime() + this.id;
    };

    return CalendarEvent;
}());