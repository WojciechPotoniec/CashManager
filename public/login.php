<?php
require_once __DIR__ . '../../src/config.php';

// Se l'utente è già loggato, reindirizzalo alla pagina principale.
if (isset($_COOKIE[AUTH_COOKIE_NAME])) {
    header('Location: index.php');
    exit;
}

$errorMessage = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanificazione dell'input: rimuove spazi extra
    $passwordInserita = isset($_POST['password']) ? trim($_POST['password']) : '';

    // Verifica se la password inserita corrisponde all'hash salvato
    if (password_verify($passwordInserita, PASSWORD_HASH)) {
        // Password corretta! Creiamo e impostiamo il cookie di sessione.
        $cookieValue = hash('sha256', $_SERVER['REMOTE_ADDR'] . $_SERVER['HTTP_USER_AGENT']);

        setcookie(
            AUTH_COOKIE_NAME,
            $cookieValue,
            [
                'expires' => time() + SESSION_DURATION,
                'path' => '/',
                'httponly' => true,
                'secure' => isset($_SERVER['HTTPS']),
                'samesite' => 'Lax'
            ]
        );

        // Reindirizza l'utente alla pagina protetta
        header('Location: index.php');
        exit;
    } else {
        // Password errata
        $errorMessage = 'Password non corretta. Riprova.';
    }
}
?>

<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <title>Accesso Richiesto</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 flex items-center justify-center h-screen">
    <div class="w-full max-w-sm">
        <form method="POST" action="login.php" class="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
            <h1 class="text-2xl font-bold mb-6 text-center text-gray-700">Autenticazione Richiesta</h1>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
                <input class="shadow appearance-none border <?php if($errorMessage) echo 'border-red-500'; ?> rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                       id="password" name="password" type="password" placeholder="******" maxlength="6" required autofocus>
            </div>

            <?php if ($errorMessage): ?>
                <p class="text-red-500 text-xs italic mb-4"><?php echo $errorMessage; ?></p>
            <?php endif; ?>

            <div class="flex items-center justify-center">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Accedi
                </button>
            </div>
        </form>
    </div>
</body>
</html>