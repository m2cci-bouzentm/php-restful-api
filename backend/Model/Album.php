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
    return $stmt->fetchAll();
  }

  public static function getAlbum($albumId)
  {
    $sql = 'SELECT * FROM album WHERE id = ?';
    $pdo = self::getConnection();
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$albumId]);

    $band = $stmt->fetch();
    return $band;
  }

  public static function setAlbum($albumName, $albumReleaseYear, $bandId)
  {
    $sql = 'INSERT INTO songs(albumName, albumReleaseYear, bandId) VALUES (?,?,?)';
    $pdo = self::getConnection();
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$albumName, $albumReleaseYear, $bandId]);
  }

  public static function updateAlbum($albumName, $albumId, $songId)
  {
    $songBeforeUpdate = self::getAlbum($songId);
    $oldName = $songBeforeUpdate['name'];
    $oldDuration = $songBeforeUpdate['length'];
    $oldAlbumId = $songBeforeUpdate['album_id'];

    // making sure to keep previous values as before if not modified
    if (!isset($songName)) {
      $songName = $oldName;
    }
    if (!isset($songDuration)) {
      $songDuration = $oldDuration;
    }
    if (!isset($albumId)) {
      $albumId = $oldAlbumId;
    }

    $sql = 'UPDATE songs SET name = ?, length = ?, album_id = ? WHERE id = ?';
    $pdo = self::getConnection();
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$songName, $songDuration, $albumId, $songId]);

    $songAfterUpdate = self::getSong($songId);
    return $songAfterUpdate;
  }

  public static function deleteBand($bandId)
  {
    $band = self::getBand($bandId);

    $sql = 'DELETE FROM bands WHERE id = ?';
    $pdo = self::getConnection();
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$bandId]);

    return $band;
  }
}
