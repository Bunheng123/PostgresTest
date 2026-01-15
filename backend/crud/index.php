<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// ------------------------
// CORS (allow Vercel frontend)
// ------------------------
// Allow the frontend deployed on Vercel to access the backend
header("Access-Control-Allow-Origin: https://postgres-test-j0p0tdnsd-lim-bunhengs-projects.vercel.app");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


// ------------------------
// Check UserController
// ------------------------
if (!file_exists('src/UserController.php')) {
    http_response_code(500);
    echo json_encode([
        'error' => 'UserController not found',
        'path' => __DIR__ . '/src/UserController.php'
    ]);
    exit();
}

require_once 'src/UserController.php';

// ------------------------
// Handle HTTP methods
// ------------------------
try {
    $controller = new UserController();
    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'GET':
            $controller->index(); // Return all users
            break;
        
        case 'POST':
            $controller->store(); // Create user
            break;
        
        case 'PUT':
            $controller->update(); // Update user
            break;
        
        case 'DELETE':
            $controller->destroy(); // Delete user
            break;
        
        default:
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Server error',
        'message' => $e->getMessage()
    ]);
}
