<?php

class Database
{

  private static $connection = null;
  // private static $dsn = 'mysql:host=' . HOST . ';dbname=' . DBNAME;
  private static $dsn = 'pgsql:host=' . HOST . ';dbname=' . DBNAME . ';sslmode=require';

  protected static function getConnection()
  {
    if (self::$connection === null) {
      try {
        self::$connection = new PDO(self::$dsn, USER, PASSWORD);
        // self::$connection->setAttribute(PDO::ATTR_SERVER_INFO);
        self::$connection->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        self::$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      } catch (PDOException $e) {
        die('connection to database has failed: ' . $e->getMessage());
      }
    }

    return self::$connection;
  }
}
