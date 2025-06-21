<?php
// file: logout.php
require_once __DIR__ . '../../src/config.php';

// Per eliminare un cookie, lo si imposta con una data di scadenza nel passato
setcookie(AUTH_COOKIE_NAME, '', time() - 3600, '/');

// Reindirizza alla pagina di login
header('Location: login.php');
exit;
