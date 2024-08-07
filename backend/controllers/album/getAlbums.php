<?php
header("Content-Type: application/json");

if (isset(($_GET['band_id']))) {
    $band_id = $_GET['band_id'];
    $response = json_encode(Album::getAlbumByBandId($band_id));
} else {
    $response = json_encode(Album::getAllAlbums());
}

echo $response;