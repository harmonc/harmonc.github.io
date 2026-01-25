<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$configFile = '../reviews/reviews-config.json';
if (file_exists($configFile)) {
    $config = file_get_contents($configFile);
    echo $config;
} else {
    echo json_encode(['error' => 'Config file not found']);
}
?>