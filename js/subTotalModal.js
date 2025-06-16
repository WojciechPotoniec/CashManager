/* global $ */

$(document).ready(function() {
    // --- ELEMENTI DEL DOM ---
    const openModalBtn = $('#open-subtotal-modal-btn');
    const subtotalModal = $('#add-subtotal-modal');
    const closeModalBtn = $('#close-subtotal-modal-btn');
    const subtotalForm = $('#subtotal-form');
    const subtotalAmountInput = $('#subtotal-amount');

    // Otteniamo l'istanza API di DataTables
    const mainTableApi = $('#table').dataTable().api();

    // --- FUNZIONI ---
    function openModal() {
        subtotalAmountInput.val('');
        $.ajax({
            url: 'api/api_get_last_subtotal_movement.php',
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                if (response.success && response.amount > 0) {
                    subtotalAmountInput.val(response.amount.toFixed(2));
                }
            },
            complete: function() {
                subtotalModal.removeClass('hidden').fadeIn(300);
                setTimeout(() => subtotalAmountInput.focus(), 300);
            }
        });
    }

    function closeModal() {
        subtotalModal.fadeOut(200, function() { $(this).addClass('hidden'); });
        subtotalForm[0].reset();
    }

    // --- EVENTI ---
    openModalBtn.on('click', openModal);
    closeModalBtn.on('click', closeModal);
    subtotalModal.find('.bg-white').on('click', (event) => event.stopPropagation());

    // Evento di submit del form per impostare/aggiornare l'accantonamento
    subtotalForm.on('submit', function(event) {
        event.preventDefault();
        // Usiamo 0 se il campo è vuoto, per permettere di azzerare l'accantonamento.
        const amountToSet = parseFloat(subtotalAmountInput.val()) || 0;

        if (amountToSet < 0) {
            window.app.showToast('L\'importo non può essere negativo.', 'error');
            return;
        }

        $.ajax({
            url: 'api/api_set_subtotal.php',
            type: 'POST',
            data: {
                amount: amountToSet
            },
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    mainTableApi.ajax.reload();
                    closeModal();
                    window.app.showToast(response.message || 'Operazione completata con successo!', 'success');
                } else {
                    window.app.showToast(response.message, 'error');
                }
            },
            error: function() {
                window.app.showToast('Errore di comunicazione con il server.', 'error');
            }
        });
    });
});