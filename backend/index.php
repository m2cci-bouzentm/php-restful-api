<?php

declare(strict_types=1);

// Enabling CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

// auto load my Model classes
include 'includes/auto-loader.php';

// include config
include_once 'config/dbconfig.php';

// include core classes
include_once 'core/Database.php';
include_once 'core/Router.php';


// initialize a single Router instance (before using it in the routes)
$router = new Router();

// include routes
include_once 'routes/index.php';
include_once 'routes/band.php';
include_once 'routes/song.php';



$uri = parse_url($_SERVER['REQUEST_URI'])['path'];
$method = $_SERVER['REQUEST_METHOD'];

$router->route($uri, $method);
