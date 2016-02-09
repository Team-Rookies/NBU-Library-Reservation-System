<?php
$method = '';
$dirPath = '../jsonDB/';

if(isset($_POST['method'])) {
    $method = $_POST['method'];
}

if($method == 'saveCalendar')
{
    saveCalendar($dirPath);
}

function saveCalendar($path) {
    $filename = $path . filter_input(INPUT_POST, 'name') . 'Events.json';

    if(!file_exists($filename)) {
        $file = fopen($filename, 'w');

        $obj = new stdClass();
        $obj->success = 1;
        $obj->result = array();
        fwrite($file, json_encode($obj));
        fclose($file);

        $responseArray['status'] = substr($filename, 3);
        echo json_encode($responseArray);
    } else {
        $data = array('type' => 'error', 'message' => 'File already exists');
        header('HTTP/1.1 400 Bad Request');
        header('Content-Type: application/json; charset=UTF-8');
        echo json_encode($data);
    }
}

?>