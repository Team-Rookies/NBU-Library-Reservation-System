<?php
$method = '';
$dirPath = '../jsonDB/';
$calendarsJSON = '../jsonDB/calendars.json';

if(isset($_POST['method'])) {
    $method = $_POST['method'];
}

if($method == 'saveCalendar')
{
    saveCalendar($dirPath, $calendarsJSON);
}

function saveCalendar($path, $calendars) {
    $data = json_decode(filter_input(INPUT_POST, 'data'));
    $filename = $path . $data->fileName . 'Events.json';

    if(!file_exists($filename)) {
        $calendarsFile = json_decode(file_get_contents($calendars));
        $data->fileName = $data->fileName.'Events.json';

        $count = count($calendarsFile->calendars);
        $exists = false;
        for($i = 0; $i < $count; $i++) {
            if($calendarsFile->calendars[$i]->name === $data->name) {
                $exists = true;
                break;
            }
        }

        if(!$exists) {
            array_push($calendarsFile->calendars, $data);

            file_put_contents($calendars, json_encode($calendarsFile));

            $file = fopen($filename, 'w');

            $obj = new stdClass();
            $obj->success = 1;
            $obj->result = array();
            fwrite($file, json_encode($obj));
            fclose($file);

            $responseArray['fileName'] = $data->fileName;
            $responseArray['name'] = $data->name;
            echo json_encode($responseArray);
        } else {
            $data = array('type' => 'error', 'message' => 'Calendar already in database. No file associated!');
            header('HTTP/1.1 400 Bad Request');
            header('Content-Type: application/json; charset=UTF-8');
            echo json_encode($data);
        }
    } else {
        $data = array('type' => 'error', 'message' => 'File already exists');
        header('HTTP/1.1 400 Bad Request');
        header('Content-Type: application/json; charset=UTF-8');
        echo json_encode($data);
    }
}

?>