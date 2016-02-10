var grid = grid || {};

grid.gridController = (function() {
    function loadData(filter) {
        return grid.data;
    }

    function deleteItem(item) {
        var saveData = {
            method: 'deleteEvent',
            file: grid.fileName,
            url: item.deleteUrl
        };

        $.post('../api/events.php', saveData, function (response) {
            console.log('yeah!')
        })
    }
    return {
        loadData: loadData,
        insertItem: function(item) {  },
        updateItem: function(item) {  },
        deleteItem: deleteItem
    }
}());