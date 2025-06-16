/* global $, Intl */

// Inizializza il namespace se non esiste
window.app = window.app || {};

/**
 * Mostra una notifica "toast" non invasiva per successo o errore.
 * La notifica scompare automaticamente dopo un certo periodo.
 *
 * @param {string} message Il messaggio da visualizzare.
 * @param {string} type Il tipo di notifica ('success' o 'error'). Default: 'success'.
 * @param {number} duration La durata in millisecondi prima che la notifica scompaia. Default: 3000ms.
 */
window.app.showToast = function(message, type = 'success', duration = 3000) {
    const isSuccess = type === 'success';

    // Seleziona il toast e il suo elemento per il messaggio in base al tipo
    const toastElement = isSuccess ? $('#success-toast') : $('#error-toast');
    const messageElement = isSuccess ? $('#success-toast-message') : $('#error-toast-message');

    // Imposta il messaggio
    messageElement.text(message);

    // Mostra il toast con un effetto di fade-in
    toastElement.removeClass('hidden').fadeIn(400);

    // Imposta un timer per nascondere il toast dopo la durata specificata
    setTimeout(function() {
        toastElement.fadeOut(400, function() {
            $(this).addClass('hidden');
        });
    }, duration);
};


/**
 * Formatta un valore numerico come valuta EUR.
 * @param {number} value Il valore numerico da formattare.
 * @returns {string} La stringa formattata.
 */
function formatCurrency(value) {
    if (isNaN(value)) { value = 0; }
    return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(value);
}

/**
 * Aggiorna i riquadri dei saldi con i valori forniti dal server.
 * @param {{total: number, subtotal: number}} balances - L'oggetto con i saldi.
 */
window.app.updateBalances = function(balances) {
    const totalBalanceEl = $('#totalBalance');
    const subTotalBalanceEl = $('#subTotalBalance'); // Questo è nella modale ora

    const totalValue = balances.total || 0;
    const subtotalValue = balances.subtotal || 0;

    // Aggiorna il Saldo Totale nella card principale
    totalBalanceEl.text(formatCurrency(totalValue));
    totalBalanceEl.removeClass('text-red-600 text-green-600').addClass(totalValue < 0 ? 'text-red-600' : 'text-green-600');

    // Aggiorna il Subtotale dentro la modale
    subTotalBalanceEl.text(formatCurrency(subtotalValue));
};