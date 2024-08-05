<?php
header('Content-Type: application/json');

// using php input to get the req body
$data = json_decode(file_get_contents("php://input"), true);


$name = $data['name'] ?? null;
$duration = $data['duration'] ?? null;
$albumId = $data['album-id'] ?? null;


if (strlen($name) !== 0 && strlen($duration) && $albumId) {
  Song::setSong($name, $duration, $albumId);
}
