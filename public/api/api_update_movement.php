<?php
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../../src/database.php';
/** @var mysqli $conn */

$response = ['success' => false, 'message' => ''];

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

$movementId = (int)$_POST['id'];
$categoryId = (int)$_POST['category'];
$income = !empty($_POST['incomeAmmount']) ? (float)$_POST['incomeAmmount'] : null;
$outcome = !empty($_POST['outputAmmount']) ? (float)$_POST['outputAmmount'] : null;
$note = !empty($_POST['note']) ? trim($_POST['note']) : null;


if (isset($conn)) {
    $sql = "UPDATE movements SET category_id = ?, entrata = ?, uscita = ?, note = ? WHERE id = ?";

    $stmt = $conn->prepare($sql);

    if ($stmt) {
        $stmt->bind_param('iddsi', $categoryId, $income, $outcome, $note, $movementId);

        if ($stmt->execute()) {
            if ($stmt->affected_rows > 0) {
                $response['success'] = true;
                $response['message'] = 'Movimento aggiornato con successo!';
            } else {
                $response['success'] = true; 
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