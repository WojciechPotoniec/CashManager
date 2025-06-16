<?php
header('Content-Type: application/json; charset=utf-8');
require_once '../database/db.php';
/** @var mysqli $conn */

$response = ['success' => false, 'message' => 'Errore generico.'];

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($conn)) {
    $amount = isset($_POST['amount']) ? (float)$_POST['amount'] : 0;

    if ($amount < 0) {
        $response['message'] = 'L\'importo non può essere negativo.';
        echo json_encode($response);
        exit;
    }

    // Cerchiamo se esiste già un movimento di accantonamento
    $sql_find = "SELECT id FROM movements WHERE note = 'Accantonamento' LIMIT 1";
    $result = $conn->query($sql_find);

    if ($result && $result->num_rows > 0) {
        // --- SE ESISTE: AGGIORNIAMO (UPDATE) ---
        $existing_id = $result->fetch_assoc()['id'];
        $sql_update = "UPDATE movements SET uscita = ?, transaction_date = NOW() WHERE id = ?";
        $stmt = $conn->prepare($sql_update);
        $stmt->bind_param('di', $amount, $existing_id);
        if ($stmt->execute()) {
            $response['success'] = true;
            $response['message'] = 'Accantonamento aggiornato con successo.';
        } else {
            $response['message'] = 'Errore durante l\'aggiornamento: ' . $stmt->error;
        }
        $stmt->close();

    } else {
        // --- SE NON ESISTE: INSERIAMO (INSERT) ---
        $sql_insert = "INSERT INTO movements (uscita, note, transaction_date) VALUES (?, 'Accantonamento', NOW())";
        $stmt = $conn->prepare($sql_insert);
        $stmt->bind_param('d', $amount);
        if ($stmt->execute()) {
            $response['success'] = true;
            $response['message'] = 'Accantonamento creato con successo.';
        } else {
            $response['message'] = 'Errore durante la creazione: ' . $stmt->error;
        }
        $stmt->close();
    }
    $conn->close();
} else {
    $response['message'] = 'Metodo non consentito o errore di connessione.';
}

echo json_encode($response);