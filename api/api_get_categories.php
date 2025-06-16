<?php
header('Content-Type: application/json');

include '../database/db.php';

/** @var mysqli $conn */ //

$categories = [];

// Esegui la query per selezionare tutte le categorie
$sql = "SELECT id, name FROM categories ORDER BY name ASC";
$result = $conn->query($sql);


if ($result) {
    while ($row = $result->fetch_assoc()) {
        $categories[] = $row;
    }
    $result->free();
} else {
    // Gestisci l'errore se la query fallisce
    http_response_code(500);
    echo json_encode(['error' => 'Errore nella query al database.']);
    exit;
}

$conn->close();

echo json_encode($categories);