<?php

$main_uri = '/';

// $router = new Router();

// get all albums
$router->get($main_uri . 'albums', __DIR__ . '/controllers/album/getAlbums.php');

// get one album by id
$router->get($main_uri . 'album', __DIR__ . '/controllers/album/getAlbum.php');

// add an album
$router->post($main_uri . 'album', __DIR__ . '/controllers/album/addAlbum.php');

// delete an album by id
$router->delete($main_uri . 'album', __DIR__ . '/controllers/album/destroyAlbum.php');

// update an album by id
$router->put($main_uri . 'album', __DIR__ . '/controllers/album/updateAlbum.php');
