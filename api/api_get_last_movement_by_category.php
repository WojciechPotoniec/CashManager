<?php
header('Content-Type: application/json');

include '../database/db.php';

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

// 3. Valida l'input: controlla se l'ID della categoria è stato fornito
if (!isset($_GET['category_id']) || empty($_GET['category_id'])) {
    $response['message'] = 'ID categoria non fornito.';
    echo json_encode($response);
    exit;
}

// Converte l'ID in un intero per sicurezza
$categoryId = (int)$_GET['category_id'];

// 4. Prepara la query SQL per trovare l'ultimo movimento per la categoria data
$sql = "SELECT entrata, uscita, note 
        FROM movements 
        WHERE category_id = ? 
        ORDER BY transaction_date DESC, id DESC 
        LIMIT 1";

$stmt = $conn->prepare($sql);

if ($stmt) {
    // Collega il parametro (i = integer)
    $stmt->bind_param('i', $categoryId);

    // Esegui la query
    $stmt->execute();

    // Ottieni il risultato
    $result = $stmt->get_result();

    // 5. Controlla se è stato trovato un record
    if ($result->num_rows > 0) {
        // Record trovato: imposta la risposta con successo e i dati
        $response['success'] = true;
        $response['data'] = $result->fetch_assoc();
    } else {
        // Nessun record trovato: la richiesta ha avuto successo, ma non ci sono dati.
        // Questo è un risultato valido, non un errore.
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