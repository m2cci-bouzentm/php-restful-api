<?php

header('Content-Type: application/json');

$id = $_GET['id'] ?? null;

if ($id) {
  $response = json_encode(Band::getBand($id));
  echo $response;
}
