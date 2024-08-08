<?php

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

$id = $data['id'] ?? null;
$name = $data['name'] ?? null;
$duration = $data['duration'] ?? null;
$album_id = $data['album_id'] ?? null;


if ($id) {
  $response = json_encode(Song::updateSong($name, $duration, $album_id, $id));
  echo $response;
}
