/* global $ */

// Inizializza il namespace se non esiste
window.app = window.app || {};

/**
 * Inizializza i gestori di eventi per il form di inserimento movimento.
 * @param {DataTables.Api} table - L'istanza della tabella DataTables per poterla ricaricare.
 */
window.app.initMovementForm = function(table) {
    const movementForm = $('#add-movement-form');
    const categorySelect = $('#category-select');

    // Gestione invio form
    movementForm.on('submit', function (event) {
        event.preventDefault();
        $.ajax({
            url: $(this).attr('action'),
            type: 'POST',
            data: $(this).serialize(),
            dataType: 'json',
            success: function (response) {
                if (response.success) {
                    window.app.showToast(response.message, 'success');
                    movementForm[0].reset();
                    categorySelect.val('');
                    table.ajax.reload(null, false); // Ricarica la tabella senza resettare la paginazione
                } else {
                    window.app.showToast(response.message, 'error');
                }
            },
            error: function () {
                window.app.showToast('Errore di comunicazione con il server.', 'error');
            }
        });
    });

    // Gestione pulsante "Reset"
    $('#cancel-btn').on('click', function () {
        movementForm[0].reset();
        categorySelect.val('');
    });
};