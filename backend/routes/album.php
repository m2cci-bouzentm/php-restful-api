<?php


$main_uri = '';

// $router = new Router();

// get all albums
$router->get($main_uri . 'albums', 'controllers/album/getAlbums.php');


// get one album by id
$router->get($main_uri . 'album', 'controllers/album/getAlbum.php');

// add a album
$router->post($main_uri . 'album', 'controllers/album/addAlbum.php');

// delete a album by id
$router->delete($main_uri . 'album', 'controllers/album/destroyAlbum.php');

// update a album by id
$router->put($main_uri . 'album', 'controllers/album/updateAlbum.php');
