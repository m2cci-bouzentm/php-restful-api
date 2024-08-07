<?php

header('Content-Type: application/json');


if (isset($_GET["album_id"])) {
    $album_id = $_GET["album_id"];
    $response = json_encode(Song::getSongByAlbumId($album_id));
} else {
    $response = json_encode(Song::getAllSongs());
}


echo $response;
