<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../../src/database.php';

/** @var mysqli $conn */

// La query seleziona tutte le categorie, ordinandole per nome
$result = $conn->query("SELECT id, name, isActive FROM categories ORDER BY name");

// Trasforma il risultato in un array associativo
$categories = $result->fetch_all(MYSQLI_ASSOC);

// Stampa l'array in formato JSON
echo json_encode($categories);

$conn->close();