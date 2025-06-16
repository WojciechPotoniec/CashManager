<?php
header('Content-Type: application/json; charset=utf-8');
require_once '../database/db.php'; // Assicurati che il percorso sia corretto
/** @var mysqli $conn */

$response = [
    'success' => false,
    'amount' => 0
];

if (isset($conn)) {
    // Trova l'importo (uscita) dell'ultimo movimento la cui nota è 'Accantonamento'.
    $sql = "SELECT uscita FROM movements WHERE note = 'Accantonamento' ORDER BY transaction_date DESC, id DESC LIMIT 1";

    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $response['success'] = true;
        $response['amount'] = (float)$row['uscita'];
    } else {
        // Se non ci sono accantonamenti, la richiesta ha comunque successo, ma l'importo è 0.
        $response['success'] = true;
    }

    $conn->close();
}

echo json_encode($response);