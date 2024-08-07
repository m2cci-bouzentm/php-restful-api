<?php

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

$id = $data['id'] ?? null;
$name = $data['name'] ?? null;
$release_year = $data['release_year'] ?? null;
$band_id = $data['band_id'] ?? null;


// at_least_one : to make sure that at least one field is updated, in order to avoid database sollicitation for nothing

$at_least_one = $name || $release_year || $band_id;

if ($id && $at_least_one) {
    $response = json_encode(Album::updateAlbum($name, $release_year, $band_id, $id));
    echo $response;
}
