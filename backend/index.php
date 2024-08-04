<?php

declare(strict_types=1);

// auto load my Model classes
include 'includes/auto-loader.php';

include_once 'config/dbconfig.php';
include_once 'core/Database.php';
include_once 'core/Router.php';
include_once 'routes/api.php';



$uri = parse_url($_SERVER['REQUEST_URI'])['path'];






$method = $_SERVER['REQUEST_METHOD'];
$router->route($uri, $method);
