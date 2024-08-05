<?php

declare(strict_types=1);

// auto load my Model classes
include 'includes/auto-loader.php';

// include config
include_once 'config/dbconfig.php';

// include core classes
include_once 'core/Database.php';
include_once 'core/Router.php';

// initialize a single Router instance
$router = new Router();

// include routes
include_once 'routes/index.php';
include_once 'routes/band.php';
include_once 'routes/song.php';



$uri = parse_url($_SERVER['REQUEST_URI'])['path'];
$method = $_SERVER['REQUEST_METHOD'];

$router->route($uri, $method);
