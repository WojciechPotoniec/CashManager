<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../../src/database.php';

/** @var mysqli $conn */

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Metodo non consentito.']);
    exit;
}

$id = $_POST['id'] ?? null;
$isActive = $_POST['isActive'] ?? null;

if (!is_numeric($id) || !in_array($isActive, ['0', '1'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Dati mancanti o non validi per cambiare lo stato.']);
    exit;
}

$sql = "UPDATE categories SET isActive = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
if ($stmt === false) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Errore preparazione query.']);
    exit;
}

$stmt->bind_param("ii", $isActive, $id);

if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        $statusText = ($isActive == 1) ? 'attivata' : 'disattivata';
        echo json_encode(['success' => true, 'message' => "Categoria $statusText con successo!"]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Nessuna modifica effettuata. Lo stato era già quello impostato.']);
    }
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Errore durante l\'aggiornamento dello stato.']);
}

$stmt->close();
$conn->close();