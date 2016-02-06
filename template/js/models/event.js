var CalendarEvent = (function () {
    function CalendarEvent(title, department, multimedia, additionalInfo, username, phone, email, start, end) {
        this.id = (++app.id).toString();
        this.title = title;
        this.department = department;
        this.multimedia = multimedia ? true : false;
        this.additionalInfo = additionalInfo;
        this.username = username;
        this.phone = phone;
        this.email = email;
        this.class = "event-success";
        this.start = start.toString();
        this.end = end.toString();
        this.deleteUrl = this.createDeleteUrl();
    }

    CalendarEvent.prototype.createDeleteUrl = function () {
        var root = location.protocol + '/' + location.host + location.pathname + '/';
        return root + (new Date()).getTime() + this.id;
    };

    return CalendarEvent;
}());