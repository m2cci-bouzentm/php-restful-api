<?php
header("Content-Type: application/json");

$response = json_encode(Band::getAllBands());

echo $response;
