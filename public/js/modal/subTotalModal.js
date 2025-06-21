import { showToast } from "../modules/uiHelpers.js";

export function initSubTotalModal() {

    const openModalBtn = $('#open-subtotal-modal-btn');
    const subtotalModal = $('#add-subtotal-modal');
    const closeModalBtn = $('#close-subtotal-modal-btn');
    const subtotalForm = $('#subtotal-form');
    const subtotalAmountInput = $('#subtotal-amount');

    const mainTableApi = $('#table').DataTable();

    function openModal() {
        subtotalAmountInput.val('');
        $.ajax({
            url: 'api/api_get_last_subtotal_movement.php',
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                if (response.success && response.amount > 0) {
                    subtotalAmountInput.val(parseFloat(response.amount).toFixed(2));
                }
            },
            complete: function() {
                subtotalModal.removeClass('hidden').fadeIn(300);
                setTimeout(() => subtotalAmountInput.focus(), 300);
            }
        });
    }

    function closeModal() {
        subtotalModal.fadeOut(200, function() { subtotalModal.addClass('hidden'); });
        subtotalForm[0].reset();
    }

    openModalBtn.on('click', openModal);
    closeModalBtn.on('click', closeModal);
    subtotalModal.find('.bg-white').on('click', (event) => event.stopPropagation());

    subtotalForm.on('submit', function(event) {
        event.preventDefault();
        const amountToSet = parseFloat(subtotalAmountInput.val()) || 0;

        if (amountToSet < 0) {
            if(window.app && showToast) {
                showToast('L\'importo non può essere negativo.', 'error');
            }
            return;
        }

        $.ajax({
            url: 'api/api_set_subtotal.php',
            type: 'POST',
            data: { amount: amountToSet },
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    mainTableApi.ajax.reload();
                    closeModal();
                    if(window.app && showToast) {
                        showToast(response.message || 'Operazione completata!', 'success');
                    }
                } else {
                    if(window.app && showToast) {
                        showToast(response.message, 'error');
                    }
                }
            },
            error: function() {
                if(window.app && showToast) {
                    showToast('Errore di comunicazione con il server.', 'error');
                }
            }
        });
    });
}