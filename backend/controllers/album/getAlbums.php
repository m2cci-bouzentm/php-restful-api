<?php
header("Content-Type: application/json");

$response = json_encode(Album::getAllAlbums());

echo $response;
