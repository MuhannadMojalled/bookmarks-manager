<?php

// Handle preflight (OPTIONS) requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // CORS headers for preflight
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    http_response_code(200); // Return 200 OK for preflight
    exit();
}

// Check HTTP request method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    http_response_code(405);
    echo json_encode(array('message' => 'HTTP method not allowed'));
    return;
}

// Set HTTP response headers
header('Access-Control-Allow-Origin: *'); 
header('Content-Type: application/json');


include_once '../db/Database.php';
include_once '../models/Bookmark.php';

// Instantiate DB & object and connect
$database = new Database();
$dbConnection = $database->connect();
// Instantiate a bookmark object
$bookmark = new Bookmark($dbConnection);
// get the http post request data
$data = json_decode(file_get_contents('php://input'), true);
// if no URL or title is included in the json body, return an error
if (!$data || !isset($data['URL']) || !isset($data['title'])){
    http_response_code(422);
    echo json_encode(
        array('message'=>'Error missing required parameters URL or title in JSON body'));
    return;

}

$bookmark->setURL($data['URL']);
$bookmark->setTitle($data['title']);
if ($bookmark->create()){
    echo json_encode(array('message'=>'bookmark created successfully'));
}
else {
    echo json_encode(array('message'=>'Unable to create bookmark'));
}

