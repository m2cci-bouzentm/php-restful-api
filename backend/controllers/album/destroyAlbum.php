<?php

header("Content-Type: application/json");
$data = json_decode(file_get_contents("php://input"), true);


$albumId = $data["id"] ?? null;

if ($albumId) {
    $response = json_encode(Album::deleteAlbum($albumId));
    echo $response ? "Deleted Successfully" : "Error Deleting Album";
}