<?php


class Router
{

  protected $routes = [];

  public function get($uri, $controller)
  {
    $this->routes[] = [
      'uri' => $uri,
      'controller' => $controller,
      'method' => 'GET'

    ];
  }

  public function post($uri, $controller)
  {
    $this->routes[] = [
      'uri' => $uri,
      'controller' => $controller,
      'method' => 'POST'

    ];
  }

  public function delete($uri, $controller)
  {
    $this->routes[] = [
      'uri' => $uri,
      'controller' => $controller,
      'method' => 'DELETE'

    ];
  }

  public function put($uri, $controller)
  {
    $this->routes[] = [
      'uri' => $uri,
      'controller' => $controller,
      'method' => 'PUT'

    ];
  }


  public function route($uri, $method)
  {
    foreach ($this->routes as $route) {
      if ($route['uri'] === $uri && $route['method'] === strtoupper($method)) {
        include $route['controller'];
        return;
      }
    }

    $this->abort();
  }

  protected function abort($code = 404)
  {
    http_response_code($code);
    echo '<h1> 404 File Not Found </h1>'; // it's supposed to be a view but im building a restful api
    die();
  }
}
