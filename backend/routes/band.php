<?php


$main_uri = '/php-restful-api/backend/';

// $router = new Router();

// get all bands
$router->get($main_uri . 'bands', 'controllers/band/getBands.php');

// get one band by id
$router->get($main_uri . 'band', 'controllers/band/getBand.php');

// add a band
$router->post($main_uri . 'band', 'controllers/band/addBand.php');

// delete a band by id
$router->delete($main_uri . 'band', 'controllers/band/destroyBand.php');

// update a band by id
$router->put($main_uri . 'band', 'controllers/band/updateBand.php');
