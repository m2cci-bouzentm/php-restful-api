<?php

class Song extends Database
{
  private $name;
  private $length;
  private $albumId;

  public function __construct($name, $length, $albumId)
  {
    $this->name = $name;
    $this->length = $length;
    $this->albumId = $albumId;
  }

  public static function getAllSongs()
  {
    $sql = 'SELECT * FROM songs';
    $pdo = self::getConnection();
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $songs = $stmt->fetchAll();

    return $songs;
  }

  public static function getSong($songId)
  {
    $sql = 'SELECT * FROM songs WHERE id = ?';
    $pdo = self::getConnection();
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$songId]);

    $song = $stmt->fetch();
    return $song;
  }

  public static function setSong($songName, $songDuration, $albumId)
  {
    $sql = 'INSERT INTO songs(name, length, album_id) VALUES (?,?,?)';
    $pdo = self::getConnection();
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$songName, $songDuration, $albumId]);
  }

  public static function updateSong($songName, $songDuration, $albumId, $songId)
  {
    $songBeforeUpdate = self::getSong($songId);
    $oldName = $songBeforeUpdate['name'];
    $oldDuration = $songBeforeUpdate['length'];
    $oldAlbumId = $songBeforeUpdate['album_id'];

    // making sure to keep previous values as before if not modified
    if (!$songName) {
      $songName = $oldName;
    }
    if (!$songDuration) {
      $songDuration = $oldDuration;
    }
    if (!$albumId) {
      $albumId = $oldAlbumId;
    }

    $sql = 'UPDATE songs SET name = ?, length = ?, album_id = ? WHERE id = ?';
    $pdo = self::getConnection();
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$songName, $songDuration, $albumId, $songId]);

    $songAfterUpdate = self::getSong($songId);
    return $songAfterUpdate;
  }

  public static function deleteSong($songId)
  {
    $song = self::getSong($songId);

    $sql = 'DELETE FROM songs WHERE id = ?';
    $pdo = self::getConnection();
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$songId]);

    return $song;
  }
}
