<?php

header("Content-Type: application/json");
$data = json_decode(file_get_contents("php://input"), true);


$name = $data['name'] ?? null;
$id = $data['id'] ?? null;

if ($name && $id) {
  $response = json_encode(Band::updateBand($name, $id));
  echo $response;
}
