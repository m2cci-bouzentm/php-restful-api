<?php

class Band extends Database
{
  private $name;
  // private static $pdo = self::getConnection();

  public function __construct($name)
  {
    $this->name = $name;
  }

  public static function getAllBands()
  {
    $sql = 'SELECT * FROM bands';
    $pdo = self::getConnection();
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $bands = $stmt->fetchAll();

    return $bands;
  }

  public static function getBand($bandId)
  {
    $sql = 'SELECT * FROM bands WHERE id = ?';
    $pdo = self::getConnection();
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$bandId]);

    $band = $stmt->fetch();
    return $band;
  }

  public static function setBand($bandName)
  {
    $sql = 'INSERT INTO bands(name) VALUES (?)';
    $pdo = self::getConnection();
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$bandName]);
  }

  public static function updateBand($bandName, $bandId)
  {
    $sql = 'UPDATE bands SET name = ? WHERE id = ?';
    $pdo = self::getConnection();
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$bandName, $bandId]);

    $band = self::getBand($bandId);
    return $band;
  }

  public static function deleteBand($bandId)
  {
    $band = self::getBand($bandId);

    $sql = 'DELETE FROM bands WHERE id = ?';
    $pdo = self::getConnection();
    $stmt = $pdo->prepare($sql);

    try {
      $stmt->execute([$bandId]);
    } catch (Exception $e) {
      if ($e->getCode() === '23000') {
        http_response_code(403);
        return $e->getMessage();
      }
    }


    return $band;
  }
}
