<?php

header('Content-Type: application/json');
// $data = json_decode(file_get_contents('php://input'), true);
// print_r($data);

$id = $_GET['id'] ?? null;

if ($id) {
  $response = json_encode(Song::deleteSong($id));

  echo $response;
}
