<?php

if (empty($_GET['url'])) {
    exit("Direct access not allowed");
}
$file = "events.json";
$url = filter_input(INPUT_GET, 'url');
$jsonInPHP = json_decode(file_get_contents($file));

//iterate
$results = count($jsonInPHP->result);
for ($r = 0; $r < $results; $r++) {

    if ($jsonInPHP->result[$r]->deleteUrl === "$url") {

        // remove the match
        unset($jsonInPHP->result[$r]);
        break;
    }
}

$jsonInPHP->result = array_values($jsonInPHP->result);
file_put_contents($file, json_encode($jsonInPHP));
header("Location: ./index-bs3.html");
die();
