<?php

header("Content-Type: application/json");
$data = json_decode(file_get_contents("php://input"), true);


$name = $data['name'] ?? null;

if ($name) {
  Band::setBand($name);
}
