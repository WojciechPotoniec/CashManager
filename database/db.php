<?php
$host = 'localhost';
$db   = 'cashmanager_db';
$user = 'root';
$pass = '';

$conn = new mysqli($host, $user, $pass, $db);

if($conn->connect_error) {
    die("Connessione fallita: " . $conn->connect_error);
}
    $conn->set_charset("utf8mb4");

