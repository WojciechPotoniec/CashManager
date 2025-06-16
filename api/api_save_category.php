<?php
header('Content-Type: application/json');
include '../database/db.php';

/** @var mysqli $conn */

// Controlla che il metodo sia POST e che il nome sia stato inviato
if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !isset($_POST['name'])) {
    http_response_code(400); // Bad Request
    echo json_encode(['success' => false, 'message' => 'Dati non validi.']);
    exit;
}

$categoryName = trim($_POST['name']);

if (empty($categoryName)) {
    echo json_encode(['success' => false, 'message' => 'Il nome della categoria non può essere vuoto.']);
    exit;
}

$stmt = $conn->prepare("INSERT INTO categories (name) VALUES (?)");

if ($stmt === false) {
    echo json_encode(['success' => false, 'message' => 'Errore del server (prepare).']);
    exit;
}

$stmt->bind_param("s", $categoryName);

if ($stmt->execute()) {
    $newCategoryId = $conn->insert_id;

    // Restituisci una risposta di successo con i dati della nuova categoria
    echo json_encode([
        'success' => true,
        'message' => 'Categoria creata con successo!',
        'category' => [
            'id'   => $newCategoryId,
            'name' => $categoryName
        ]
    ]);
} else {
    // Gestisci l'errore di duplicato (se hai un vincolo UNIQUE sul nome)
    if ($conn->errno == 1062) { // 1062 è il codice errore per Duplicate entry
        echo json_encode(['success' => false, 'message' => 'Una categoria con questo nome esiste già.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Errore durante il salvataggio nel database.']);
    }
}

$stmt->close();
$conn->close();