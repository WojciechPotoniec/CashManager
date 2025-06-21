<?php
// Sostituisci 'TuaPsw' con la tua vera password di 6 caratteri
$passwordInChiaro = '123456';

// Genera l'hash della password
$hashCifrato = password_hash($passwordInChiaro, PASSWORD_DEFAULT);

// Stampa l'hash a schermo
echo '<strong>' . htmlspecialchars($hashCifrato) . '</strong>';
