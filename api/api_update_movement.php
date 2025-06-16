<?php
header('Content-Type: application/json; charset=utf-8');

include '../database/db.php';
/** @var mysqli $conn */

// Risposta standard
$response = ['success' => false, 'message' => ''];

// --- 1. Validazione dell'Input ---
if (!isset($_POST['id']) || !is_numeric($_POST['id'])) {
    $response['message'] = 'ID del movimento non valido o mancante.';
    echo json_encode($response);
    exit;
}
if (!isset($_POST['category']) || !is_numeric($_POST['category'])) {
    $response['message'] = 'Categoria non valida.';
    echo json_encode($response);
    exit;
}

// Pulisci e assegna le variabili
$movementId = (int)$_POST['id'];
$categoryId = (int)$_POST['category'];
$income = !empty($_POST['incomeAmmount']) ? (float)$_POST['incomeAmmount'] : null;
$outcome = !empty($_POST['outputAmmount']) ? (float)$_POST['outputAmmount'] : null;
$note = !empty($_POST['note']) ? trim($_POST['note']) : null;


// --- 2. Esecuzione dell'Aggiornamento sul Database ---
if (isset($conn)) {
    // Usiamo un prepared statement per la massima sicurezza contro SQL Injection
    $sql = "UPDATE movements SET category_id = ?, entrata = ?, uscita = ?, note = ? WHERE id = ?";

    $stmt = $conn->prepare($sql);

    if ($stmt) {
        // 'idiss' sta per: i=integer, d=double, d=double, s=string, s=string, i=integer
        $stmt->bind_param('iddsi', $categoryId, $income, $outcome, $note, $movementId);

        if ($stmt->execute()) {
            if ($stmt->affected_rows > 0) {
                $response['success'] = true;
                $response['message'] = 'Movimento aggiornato con successo!';
            } else {
                $response['success'] = true; // La query ha funzionato, ma non hai cambiato nulla
                $response['message'] = 'Nessuna modifica rilevata.';
            }
        } else {
            $response['message'] = 'Errore durante l\'aggiornamento del movimento.';
        }
        $stmt->close();
    } else {
        $response['message'] = 'Errore nella preparazione della query.';
    }
    $conn->close();
} else {
    $response['message'] = 'Errore di connessione al database.';
}

echo json_encode($response);