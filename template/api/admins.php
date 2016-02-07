<?php
$file = '../admins.json';
$sessions = '../sessions.json';
$method = '';

if(isset($_POST['method'])) {
    $method = $_POST['method'];
}

if($method == 'saveAdmin')
{
    saveAdmin($file);
}
else if($method == 'saveSession') {
    saveSession($sessions);
}
else if($method == 'deleteSession') {
    deleteSession($sessions);
}

function saveAdmin($file) {
    $eventJSON = filter_input(INPUT_POST, 'json');
    file_put_contents($file, $eventJSON);

    $responseArray['status'] = 'success';
    echo json_encode($responseArray);
}

function saveSession($file) {
    $data = filter_input(INPUT_POST, 'data');
    $jsonInPHP = json_decode(file_get_contents($file));

    array_push($jsonInPHP->sessions, $data);
    $jsonInPHP->sessions = array_values($jsonInPHP->sessions);
    file_put_contents($file, json_encode($jsonInPHP));

    $responseArray['status'] = 'success';
    echo json_encode($responseArray);
}

function deleteSession($file) {
    $data = filter_input(INPUT_POST, 'data');

    $jsonInPHP = json_decode(file_get_contents($file));

    $results = count($jsonInPHP->sessions);
    for ($r = 0; $r < $results; $r++) {
        if ($jsonInPHP->sessions[$r] == $data) {
            unset($jsonInPHP->sessions[$r]);
        }
    }

    $jsonInPHP->sessions = array_values($jsonInPHP->sessions);
    file_put_contents($file, json_encode($jsonInPHP));

    $responseArray['status'] = 'success';
    echo json_encode($responseArray);
}
?>