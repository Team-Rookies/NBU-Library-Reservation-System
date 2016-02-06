var DateRange = (function() {
    function DateRange(startTime, endTime) {
        if(startTime > endTime) {
            throw Error('Start time should be earlier than end time.');
        }
        this.startTime = startTime;
        this.endTime = endTime;
    }
    DateRange.prototype.checkInRange = function(date) {
        return this.startTime >= date && this.endTime <= date;
    };

    return DateRange;
}());