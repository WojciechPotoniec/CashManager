<?php
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/../../src/database.php';
/** @var mysqli $conn */

$response = [
    'success' => false,
    'amount' => 0
];

if (isset($conn)) {
    $sql = "SELECT uscita FROM movements WHERE note = 'Accantonamento' ORDER BY transaction_date DESC, id DESC LIMIT 1";

    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $response['success'] = true;
        $response['amount'] = (float)$row['uscita'];
    } else {
        $response['success'] = true;
    }

    $conn->close();
}

echo json_encode($response);