<?php
require_once __DIR__ . '/config.php';

function is_ajax_request(): bool
{
    return !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}

$isAuthenticated = false;

if (isset($_COOKIE[AUTH_COOKIE_NAME])) {
    $expectedValue = hash('sha256', $_SERVER['REMOTE_ADDR'] . $_SERVER['HTTP_USER_AGENT']);
    if ($_COOKIE[AUTH_COOKIE_NAME] === $expectedValue) {
        $isAuthenticated = true;
    }
}

if (!$isAuthenticated) {
    setcookie(AUTH_COOKIE_NAME, '', time() - 3600, '/');

    if (is_ajax_request()) {
        http_response_code(401);
        echo json_encode(['error' => 'Sessione scaduta o non autorizzata.']);
    } else {
        header('Location: login.php');
    }
    exit;
}

setcookie(
    AUTH_COOKIE_NAME,
    $_COOKIE[AUTH_COOKIE_NAME],
    [
        'expires' => time() + SESSION_DURATION,
        'path' => '/',
        'httponly' => true,
        'secure' => isset($_SERVER['HTTPS']),
        'samesite' => 'Lax'
    ]
);