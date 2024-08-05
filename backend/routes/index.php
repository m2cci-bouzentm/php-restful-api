<?php


$main_uri = '/php-restful-api/backend/';

$router = new Router();

$router->get($main_uri . '', 'controllers/index.php');
