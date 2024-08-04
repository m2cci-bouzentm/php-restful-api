<?php

spl_autoload_register('myAutoLoader');


function myAutoLoader($className)
{

  $url = $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];

  $path = 'Model/';

  $extension = '.php';
  $fullPath = $path . $className . $extension;

  if (!file_exists($fullPath)) {
    return false;
  }


  require_once $fullPath;
}
