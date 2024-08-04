<?php

class Song
{
  private $name;
  private $length;
  private $album_id;

  public function __construct($name, $length, $album_id)
  {
    $this->name = $name;
    $this->length = $length;
    $this->album_id = $album_id;
  }
}
