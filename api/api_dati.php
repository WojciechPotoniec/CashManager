<?php
// Imposta l'header per indicare che la risposta è in formato JSON
header('Content-Type: application/json; charset=utf-8');

// Include il file di connessione al database
include '../database/db.php';
/** @var mysqli $conn */

$response = [
    'tableData' => [],
    'balances'  => [
        'total'    => 0,
        'subtotal' => 0
    ]
];

if (isset($conn) && $conn->ping()) {

    // --- 1. CALCOLO DEI SALDI (SUL SERVER) ---
    $sql_balances = "SELECT 
                        (SELECT SUM(entrata) FROM movements) as total_income,
                        (SELECT SUM(uscita) FROM movements) as total_outcome,
                        (SELECT SUM(uscita) FROM movements WHERE note = 'Accantonamento') as total_set_aside,
                        (SELECT SUM(entrata) FROM movements WHERE note = 'Riaccredito Subtotale') as total_credited_back";

    $result_balances = $conn->query($sql_balances);
    if ($result_balances && $result_balances->num_rows > 0) {
        $balances = $result_balances->fetch_assoc();

        // Calcoliamo i saldi e li inseriamo nella nostra risposta
        $response['balances']['total'] = ($balances['total_income'] ?? 0) - ($balances['total_outcome'] ?? 0);
        $response['balances']['subtotal'] = ($balances['total_set_aside'] ?? 0) - ($balances['total_credited_back'] ?? 0);
    }

    // --- 2. RECUPERO DEI DATI PER LA TABELLA (FILTRATI) ---
    $sql_table = "
        SELECT 
            m.id,
            DATE_FORMAT(m.transaction_date, '%d/%m/%Y %H:%i') AS data,
            m.category_id,
            c.name AS category,
            m.entrata,
            m.uscita,
            m.note
        FROM 
            movements AS m
        LEFT JOIN 
            categories AS c ON m.category_id = c.id
        WHERE 
            m.note IS NULL OR m.note NOT IN ('Accantonamento', 'Riaccredito Subtotale')
        ORDER BY 
            m.transaction_date DESC, m.id DESC
    ";

    $result_table = $conn->query($sql_table);
    if ($result_table) {
        while ($row = $result_table->fetch_assoc()) {
            $response['tableData'][] = $row;
        }
        $result_table->free();
    } else {
        echo json_encode(["error" => "Errore nella query della tabella: " . $conn->error]);
        exit;
    }

    $conn->close();

} else {
    echo json_encode(["error" => "Errore di connessione al database."]);
    exit;
}


// --- 3. INVIO DELLA RISPOSTA FINALE A DATATABLES ---
echo json_encode(["data" => $response]);