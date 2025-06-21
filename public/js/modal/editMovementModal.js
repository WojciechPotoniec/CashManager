import { showToast } from '../modules/uiHelpers.js';
import { loadCategories } from '../modules/categoryService.js';

export function initEditMovementModal(table) {

    const editModal = $('#edit-movement-modal');
    const editForm = $('#edit-movement-form');
    const editCategorySelect = $('#edit-category-select');
    const closeBtn = $('#close-edit-modal-btn');
    const cancelBtn = $('#cancel-edit-btn');

    function openModal(rowData) {
        $('#edit-movement-id').val(rowData.id);

        editCategorySelect.val(rowData.category_id);

        $('#edit-incomeAmmount').val(rowData.entrata);
        $('#edit-outputAmmount').val(rowData.uscita);
        $('#edit-note').val(rowData.note);

        editModal.removeClass('hidden').fadeIn(300);
    }

    function closeModal() {
        editModal.fadeOut(200, function() {
            $(this).addClass('hidden');
        });
        editForm[0].reset();
    }

    $('#table tbody').on('click', '.edit-btn', function() {
        const rowData = table.row($(this).closest('tr')).data();
        if (!rowData) {
            console.error("Impossibile recuperare i dati della riga per la modifica.");
            return;
        }

        loadCategories().done(function(categories) {
            const movementCategory = categories.find(c => c.id == rowData.category_id);

            if (movementCategory && movementCategory.isActive == 0) {
                showToast('La categoria è disattivata. Attivala prima di modificare il movimento.', 'error');
            } else {
                openModal(rowData);
            }
        }).fail(function() {
            showToast('Errore nel recuperare lo stato della categoria.', 'error');
        });
    });

    closeBtn.on('click', closeModal);
    cancelBtn.on('click', closeModal);
    editModal.find('.bg-white').on('click', (event) => event.stopPropagation());

    editForm.on('submit', function(event) {
        event.preventDefault();

        $.ajax({
            url: $(this).attr('action'),
            type: 'POST',
            data: $(this).serialize(),
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    closeModal();
                    showToast(response.message, 'success');
                    table.ajax.reload(null, false);
                } else {
                    showToast(response.message, 'error');
                }
            },
            error: function() {
                showToast('Errore di comunicazione con il server.', 'error');
            }
        });
    });
}