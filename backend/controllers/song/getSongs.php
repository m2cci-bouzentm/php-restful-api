<?php

header('Content-Type: application/json');

$response = json_encode(Song::getAllSongs());

echo $response;
