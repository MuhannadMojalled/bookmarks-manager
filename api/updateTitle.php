<?php

// Handle preflight (OPTIONS) requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // CORS headers for preflight
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    http_response_code(200); // Return 200 for preflight
    exit();
}

// Check HTTP request method
if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    header('Allow: PUT');
    http_response_code(405);
    echo json_encode(array('message' => 'HTTP method not allowed'));
    return;
}


// set http response headers
header('Access-Control-Allow-Origin: *'); 
header('Content-Type: application/json');

include_once '../db/Database.php';
include_once '../models/Bookmark.php';

// Instantiate DB & object and connect
$database = new Database();
$dbConnection = $database->connect();
// Instantiate a todo object
$bookmark = new Bookmark($dbConnection);

//get the http put request body
$data = json_decode(file_get_contents('php://input'));

if (! $data ||  !$data->id || !$data->title){
    http_response_code(422);
    echo json_encode(array('message'=>'error messing require parameters id and title.'));
    return;
}
    
// update the bookmark
$bookmark->setId($data->id);
$bookmark->setTitle($data->title);

if($bookmark->updateTitle()){
    http_response_code(200);
    echo json_encode(array('message'=>'bookmark updated'));
}else{
    http_response_code(503);
    echo json_encode(array('message'=>'Unable to update bookmark'));
}