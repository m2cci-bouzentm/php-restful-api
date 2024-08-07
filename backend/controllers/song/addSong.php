<?php
header('Content-Type: application/json');

// using php input to get the req body
$data = json_decode(file_get_contents("php://input"), true);


$name = $data['name'] ?? null;
$duration = $data['length'] ?? null;
$albumId = $data['album_id'] ?? null;



if (isset($name) && isset($duration) && isset($albumId)) {
  Song::setSong($name, $duration, $albumId);
}