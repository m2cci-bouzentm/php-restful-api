<?php


$main_uri = '/php-restful-api/backend/';

// $router = new Router();

// get all songs
$router->get($main_uri . 'songs', 'controllers/song/getSongs.php');

// get one song by id
$router->get($main_uri . 'song', 'controllers/song/getSong.php');

// add a song
$router->post($main_uri . 'song', 'controllers/song/addSong.php');

// delete a song by id
$router->delete($main_uri . 'song', 'controllers/song/destroySong.php');

// update a song by id
$router->put($main_uri . 'song', 'controllers/song/updateSong.php');
