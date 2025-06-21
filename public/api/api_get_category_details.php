<?php

header('Content-Type: application/json');
require_once __DIR__ . '/../../src/database.php';

/** @var mysqli $conn */
$id = $_GET['id'] ?? 0;

if (!is_numeric($id) || $id <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'ID non valido']);
    exit;
}

$stmt = $conn->prepare("SELECT id, name, isActive FROM categories WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();
$category = $result->fetch_assoc();

if ($category) {
    echo json_encode($category);
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Categoria non trovata']);
}

$stmt->close();
$conn->close();