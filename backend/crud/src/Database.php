<?php 
class Database {
    private static $pdo;
    
    public static function getConnect() {
        if (self::$pdo !== null) {
            return self::$pdo;
        }
        
        // Load .env file
        if (file_exists(__DIR__ . '/.env')) {
            $lines = file(__DIR__ . '/.env', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            foreach ($lines as $line) {
                if (strpos(trim($line), '#') === 0) continue;
                list($key, $value) = explode('=', $line, 2);
                $_ENV[trim($key)] = trim($value);
            }
        }
        
        try {
            $host = $_ENV['DB_HOST'] ?? 'ep-billowing-bush-a11mcl4p-pooler.ap-southeast-1.aws.neon.tech';
            $port = $_ENV['DB_PORT'] ?? '5432';
            $dbname = $_ENV['DB_DATABASE'] ?? 'neondb';
            $user = $_ENV['DB_USERNAME'] ?? 'neondb_owner';
            $password = $_ENV['DB_PASSWORD'] ?? 'npg_aRndmX2OziZ4';
            $sslmode = $_ENV['DB_SSLMODE'] ?? 'require';
            
            // Extract endpoint ID from hostname
            $endpointId = explode('.', $host)[0];
            
            // Simple DSN with endpoint parameter only
            $dsn = "pgsql:host=$host;port=$port;dbname=$dbname;sslmode=$sslmode;options=endpoint=$endpointId";
            
            self::$pdo = new PDO(
                $dsn,
                $user,
                $password,
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
                ]
            );
            // Connection successful (silent)
               
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["message" => "Database Connection failed"]);
            error_log("DB connection error: " . $e->getMessage());
            die();
        }
        
        return self::$pdo;
    }
}