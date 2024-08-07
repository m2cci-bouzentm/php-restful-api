<?php

header('Content-Type: application/json');

$id = $_GET['id'] ?? null;

if ($id) {
    $response = json_encode(Album::getAlbum($id));
    echo $response;
}
