<?php

header("Content-Type: application/json");
$data = json_decode(file_get_contents("php://input"), true);




$name = $data['name'] ?? null;
$release_year = $data['release_year'] ?? null;
$band_id = $data['band_id'] ?? null;


if ($name && $release_year && $band_id) {
    Album::setAlbum($name, $release_year, $band_id);
    return json_encode("Album Added Successfully");
}