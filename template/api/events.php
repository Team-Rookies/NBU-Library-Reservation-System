<?php
    $file = '../events.json';
    $method = '';

    if(isset($_POST['method'])) {
        $method = $_POST['method'];
    }

    if(isset($_GET['id'])) {
        deleteEvent($file, $_GET['id']);
    }

    if($method == 'saveEvent')
    {
        saveEvent($file);
    }
    else if($method == 'deleteEvent')
    {
        $url = filter_input(INPUT_POST, 'url');
        deleteEvent($file, $url);
    }

    function saveEvent($file) {
        $eventJSON = filter_input(INPUT_POST, 'json');
        $to = filter_input(INPUT_POST, 'email');
        $deleteUrl = filter_input(INPUT_POST, 'deleteUrl');
        $username = filter_input(INPUT_POST, 'username');
        $email = 'fake@fake.com';


        $subject = "Thank you for creating event";
        $message = "
Hello $username,<br/>
You have successfully created an event! To remove the event click on the following link:<br/><br/>
<a href='$deleteUrl'>$deleteUrl</a><br/><br/>
Best Regards,<br/>
Team Rookies";
        $headers = 'From: ' . $email . "\r\n" .
            'Reply-To: ' . $email . "\r\n" .
            'Content-Type:text/html; charset=UTF-8' . "\r\n" .
            'X-Mailer: PHP/' . phpversion();
        if(mail($to, $subject, $message, $headers)) {
            echo 'success';
        } else {
            echo "error sending mail";
        }
        file_put_contents($file, $eventJSON);
    }

    function deleteEvent($file, $url) {
        $jsonInPHP = json_decode(file_get_contents($file));

        $results = count($jsonInPHP->result);
        for ($r = 0; $r < $results; $r++) {
            if ($jsonInPHP->result[$r]->deleteUrl == $url) {
                unset($jsonInPHP->result[$r]);
            }
        }

        $jsonInPHP->result = array_values($jsonInPHP->result);
        file_put_contents($file, json_encode($jsonInPHP));
        header('Location: '.'../index.html');
    }

?>