<?php
header('Content-Type: application/json');
include '../database/db.php';

/** @var mysqli $conn */

// Usiamo POST per le operazioni che modificano i dati
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['success' => false, 'message' => 'Metodo non consentito.']);
    exit;
}

// Controlliamo che l'ID sia stato inviato e sia un numero valido
if (!isset($_POST['id']) || !is_numeric($_POST['id'])) {
    http_response_code(400); // Bad Request
    echo json_encode(['success' => false, 'message' => 'ID del movimento non valido o mancante.']);
    exit;
}

$movementId = (int)$_POST['id'];

$sql = "DELETE FROM movements WHERE id = ?";
$stmt = $conn->prepare($sql);

if ($stmt === false) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Errore nella preparazione della query.']);
    exit;
}

// Colleghiamo l'ID alla query
$stmt->bind_param("i", $movementId);

// Eseguiamo la query
if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(['success' => true, 'message' => 'Movimento eliminato con successo!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Nessun movimento trovato con questo ID.']);
    }
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Errore durante l\'eliminazione del movimento.']);
}

$stmt->close();
$conn->close();