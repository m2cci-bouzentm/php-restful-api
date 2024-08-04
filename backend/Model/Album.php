<?php

class Album
{
  private $name;
  private $release_year;
  private $band_id;

  public function __construct($name, $release_year, $band_id)
  {
    $this->name = $name;
    $this->release_year = $release_year;
    $this->band_id = $band_id;
  }
}
