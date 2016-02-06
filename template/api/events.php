<?php
    $file = '../events.json';
    $method = $_POST['method'];

    if($method == 'saveEvent')
    {
        $eventJSON = filter_input(INPUT_POST, 'json');
        saveEvent($file, $eventJSON);
    }
    else if($method == 'deleteEvent')
    {
        deleteEvent($file);
    }

    function saveEvent($file, $eventJSON) {
        file_put_contents($file, $eventJSON);
        echo 'success';
        
    }

    function deleteEvent($file) {
        $url = filter_input(INPUT_POST, 'url');
        $jsonInPHP = json_decode(file_get_contents($file));

        $results = count($jsonInPHP->result);
        for ($r = 0; $r < $results; $r++) {

            if ($jsonInPHP->result[$r]->deleteUrl === "$url") {
                unset($jsonInPHP->result[$r]);
                break;
            }
        }

        $jsonInPHP->result = array_values($jsonInPHP->result);
        file_put_contents($file, json_encode($jsonInPHP));
        echo "success";
    }

?>