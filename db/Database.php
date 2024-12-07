<?php

class Database {
    private $dbHost;
    private $dbPort;
    private $dbName;
    private $dbUser;
    private $dbPassword;
    private $dbConnection;

    public function __construct() {
        // read database credentials as environment variables with fallback default values
        $this->dbHost = getenv('DB_HOST') ?: 'localhost';  // Default to 'localhost' if not set
        $this->dbPort = getenv('DB_PORT') ?: 3306;  // Default to 3306 if not set
        $this->dbName = getenv('DB_DATABASE') ?: 'bookmarks_db';  // Default to bookmarks_db if not set
        $this->dbUser = getenv('DB_USERNAME') ?: 'root';  // Default to 'root' if not set
        $this->dbPassword = getenv('DB_PASSWORD') ?: 'admin';  // Default to 'admin' if not set

        if (!$this->dbHost || !$this->dbPort || !$this->dbName || !$this->dbUser || !$this->dbPassword) {
            die('Please set database credentials as environment variables');
        }
    }

    public function connect() {
        try {
            $this->dbConnection = new PDO(
                'mysql:host=' . $this->dbHost . ';port=' . $this->dbPort . ';dbname=' . $this->dbName,
                $this->dbUser,
                $this->dbPassword
            );
            $this->dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die('Connection Error: ' . $e->getMessage());
        }
        return $this->dbConnection;
    }
}
