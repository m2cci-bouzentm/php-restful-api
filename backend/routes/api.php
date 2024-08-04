<?php



$router = new Router();

$router->get('/php-restful-api/backend/', 'controllers/index.php');

// get all bands
$router->get('/php-restful-api/backend/bands', 'controllers/getBands.php');

// get one band by id
$router->get('/php-restful-api/backend/band', 'controllers/getBand.php');

// add a band
$router->post('/php-restful-api/backend/band', 'controllers/addBand.php');

// delete a band by id
$router->delete('/php-restful-api/backend/band', 'controllers/destroyBand.php');  // or destroy.php

// update a band by id
$router->put('/php-restful-api/backend/band', 'controllers/updateBand.php');
