<?php
header('Content-Type: application/json');

require_once __DIR__ . '/../../src/database.php';

$response = [
    'success' => false,
    'data'    => null,
    'message' => ''
];

if (!isset($conn) || $conn->connect_error) {
    $response['message'] = "Errore di connessione al database. Controllare il file di configurazione.";
    echo json_encode($response);
    exit;
}

if ( empty($_GET['category_id']) ) {
    $response['message'] = 'ID categoria non fornito.';
    echo json_encode($response);
    exit;
}

$categoryId = (int)$_GET['category_id'];

$sql = "SELECT entrata, uscita, note 
        FROM movements 
        WHERE category_id = ? 
        ORDER BY transaction_date DESC, id DESC 
        LIMIT 1";

$stmt = $conn->prepare($sql);

if ($stmt) {
    $stmt->bind_param('i', $categoryId);

    $stmt->execute();

    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $response['success'] = true;
        $response['data'] = $result->fetch_assoc();
    } else {
        $response['success'] = true;
        $response['data'] = null;
        $response['message'] = 'Nessun movimento precedente trovato per questa categoria.';
    }

    $stmt->close();
} else {
    $response['message'] = 'Errore nella preparazione della query: ' . $conn->error;
}

$conn->close();

echo json_encode($response);