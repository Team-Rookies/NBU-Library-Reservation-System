var RepeatedField = function(config) {
    jsGrid.Field.call(this, config);
};

RepeatedField.prototype = new jsGrid.Field({

    css: "date-field",            // redefine general property 'css'
    align: "center",              // redefine general property 'align'

    myCustomProperty: "Repeated",      // custom property

    itemTemplate: function(value) {
        return value;
    }
});

jsGrid.fields.repeated = RepeatedField;