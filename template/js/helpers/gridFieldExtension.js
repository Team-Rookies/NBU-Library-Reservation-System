var RepeatedField = function(config) {
    jsGrid.Field.call(this, config);
};

RepeatedField.prototype = new jsGrid.Field({

    align: "center",              // redefine general property 'align'

    myCustomProperty: "Repeated",      // custom property

    itemTemplate: function(value) {
        return value;
    }
});

var CustomDate = function(config) {
    jsGrid.Field.call(this, config);
};

CustomDate.prototype = new jsGrid.Field({
    css: 'date-field',
    align: 'center',

    myCustomProperty: 'CustomDate',

    itemTemplate: function(value) {
        return new Date(Number(value)).toLocaleString();
    },

    sorter: function(d1, d2) {
        return d1 - d2;
    }

});

jsGrid.fields.customDate = CustomDate;