<?php


class Router
{

  protected $routes = [];

  private function add($method, $uri, $controller)
  {
    $this->routes[] = [
      'uri' => $uri,
      'controller' => $controller,
      'method' => $method

    ];
  }

  private function abortConnection($code = 404)
  {
    http_response_code($code);
    echo '<h1> 404 File Not Found </h1>'; // it's supposed to be a view but im building a restful api
    die();
  }

  // including each controller with its associated route
  public function route($uri, $method)
  {
    foreach ($this->routes as $route) {
      if ($route['uri'] === $uri && $route['method'] === strtoupper($method)) {
        include $route['controller'];
        return;
      }
    }

    $this->abortConnection();
  }

  public function get($uri, $controller)
  {
    $this->add('GET', $uri, $controller);
  }

  public function post($uri, $controller)
  {
    $this->add('POST', $uri, $controller);
  }

  public function delete($uri, $controller)
  {
    $this->add('DELETE', $uri, $controller);
  }

  public function put($uri, $controller)
  {
    $this->add('PUT', $uri, $controller);
  }
}
