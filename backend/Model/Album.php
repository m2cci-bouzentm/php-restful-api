<?php

class Album extends Database
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


  public static function getAllAlbums()
  {
    $sql = 'SELECT * FROM albums';
    $pdo = self::getConnection();
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $allAlbums = $stmt->fetchAll();
    return $allAlbums;
  }

  public static function getAlbum($albumId)
  {
    $sql = 'SELECT * FROM albums WHERE id = ?';
    $pdo = self::getConnection();
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$albumId]);

    $album = $stmt->fetch();
    return $album;
  }


  public static function getAlbumByBandId($band_id)
  {
    $sql = 'SELECT * FROM albums WHERE band_id = ?';
    $pdo = self::getConnection();
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$band_id]);

    $albums = $stmt->fetchAll();
    return $albums;
  }

  public static function setAlbum($albumName, $albumReleaseYear, $bandId)
  {
    // echo "\nhello from setAlbum !";
    $sql = 'INSERT INTO albums(name, release_year, band_id) VALUES (?,?,?)';
    $pdo = self::getConnection();
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$albumName, $albumReleaseYear, $bandId]);
  }

  public static function updateAlbum($albumName, $albumReleaseYear, $bandId, $albumId)
  {
    $albumBeforeUpdate = self::getAlbum($albumId);
    $oldName = $albumBeforeUpdate['name'];
    $oldReleaseYear = $albumBeforeUpdate['release_year'];
    $oldBandId = $albumBeforeUpdate['band_id'];

    // making sure to keep previous values as before if not modified

    // albumName is null ? keep the old name

    $albumName ??= $oldName;

    // albumReleaseYear is null ? keep the old release year
    $albumReleaseYear ??= $oldReleaseYear;

    // bandId is null ? keep the old band id
    $bandId ??= $oldBandId;



    // ??= is called the null coalescing operator it returns the first operand if it exists and is not null, otherwise it returns the second operand




    $sql = 'UPDATE albums SET name = ?, release_year = ?, band_id = ? WHERE id = ?';
    $pdo = self::getConnection();
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$albumName, $albumReleaseYear, $bandId, $albumId]);

    $albumAfterUpdate = self::getAlbum($albumId);
    return $albumAfterUpdate;
  }

  public static function deleteAlbum($albumId)
  {
    $album = self::getAlbum($albumId);

    $sql = 'DELETE FROM albums WHERE id = ?';
    $pdo = self::getConnection();
    $stmt = $pdo->prepare($sql);

    try {
      $stmt->execute([$albumId]);
    } catch (Exception $e) {
      if ($e->getCode() === '23000') {
        http_response_code(403);
        return $e->getMessage();
      }
    }

    return true;
  }
}







// TODO: try catch blocks for statements execution