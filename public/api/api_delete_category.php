<?php
header('Content-Type: application/json');

require_once __DIR__ . '/../../src/database.php';

/**
 * @var mysqli $conn
 * Questo commento aiuta gli editor di codice a capire che $conn è un oggetto mysqli.
 */

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Metodo non consentito.']);
    exit;
}

if (!isset($_POST['id']) || !is_numeric($_POST['id'])) {
    http_response_code(400); // 400 Bad Request
    echo json_encode(['success' => false, 'message' => 'ID della categoria non valido o mancante.']);
    exit;
}

$categoryId = (int)$_POST['id'];

$sql = "DELETE FROM categories WHERE id = ?";
$stmt = $conn->prepare($sql);

if ($stmt === false) {
    http_response_code(500); // 500 Internal Server Error
    echo json_encode(['success' => false, 'message' => 'Errore nella preparazione della query.']);
    exit;
}

$stmt->bind_param("i", $categoryId);

if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(['success' => true, 'message' => 'Categoria eliminata con successo!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Nessuna categoria trovata con questo ID.']);
    }
} else {
    http_response_code(500); // 500 Internal Server Error
    echo json_encode(['success' => false, 'message' => 'Errore durante l\'eliminazione della categoria.']);
}

$stmt->close();
$conn->close();