<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../../src/database.php';

/** @var mysqli $conn */

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Metodo non consentito.']);
    exit;
}

$categoryId = !empty($_POST['category']) ? (int)$_POST['category'] : null;
$income = !empty($_POST['incomeAmmount']) ? (float)$_POST['incomeAmmount'] : null;
$output = !empty($_POST['outputAmmount']) ? (float)$_POST['outputAmmount'] : null;
$note = !empty($_POST['note']) ? trim($_POST['note']) : null;

if ($income === null && $output === null) {
    echo json_encode(['success' => false, 'message' => 'Devi inserire almeno un importo di entrata o di uscita.']);
    exit;
}

if ($income !== null && $output !== null) {
    echo json_encode(['success' => false, 'message' => 'Non puoi inserire un valore sia per l\'entrata che per l\'uscita nello stesso movimento.']);
    exit;
}

$sql = "INSERT INTO movements (category_id, entrata, uscita, note) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

if ($stmt === false) {
    echo json_encode(['success' => false, 'message' => 'Errore nella preparazione della query.']);
    exit;
}

$stmt->bind_param("idds", $categoryId, $income, $output, $note);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Movimento salvato con successo!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Errore durante il salvataggio del movimento.']);
}

$stmt->close();
$conn->close();