<?php
    $file = '../events.json';
    $eventJSON = $_POST['json'];
    $method = $_POST['method'];

    if($method == 'saveEvent')
    {
        saveEvent($file, $eventJSON);
    }
    else if($method == 'getEvents')
    {
        getEvents($file);
    }

    function saveEvent($file, $eventJSON) {
        file_put_contents($file, $eventJSON);
        echo 'success';
    }

    function getEvents ($file) {

    }

?>