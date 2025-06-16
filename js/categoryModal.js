/* global $ */

$(document).ready(function() {
    // --- ELEMENTI DELLA PAGINA E DELLA MODALE ---
    const openModalBtn = $('#open-category-modal-btn');
    const categoryModal = $('#add-category-modal');
    const closeModalBtn = $('#close-category-modal-btn');
    const categoryForm = $('#add-category-form');
    const categoryNameInput = $('#new-category-name');
    const mainCategorySelect = $('#category-select');

    // --- FUNZIONI PER GESTIRE LA MODALE ---
    function openModal() {
        categoryModal.removeClass('hidden').fadeIn(300);
        setTimeout(() => categoryNameInput.focus(), 300);
    }

    function closeModal() {
        categoryModal.fadeOut(200, function() {
            $(this).addClass('hidden');
        });
        categoryForm[0].reset();
    }

    // --- COLLEGAMENTO DEGLI EVENTI ---
    openModalBtn.on('click', openModal);
    closeModalBtn.on('click', closeModal);
    categoryModal.on('click', function(event) {
        if (event.target === this) {
            closeModal();
        }
    });
    // Evita la chiusura della modale se si clicca all'interno del form
    categoryModal.find('.bg-white').on('click', (event) => event.stopPropagation());

    // --- GESTIONE DEL SUBMIT DEL FORM DELLA NUOVA CATEGORIA ---
    categoryForm.on('submit', function(event) {
        event.preventDefault();

        const newCategoryName = categoryNameInput.val().trim();

        // Validazione dell'input con notifica toast
        if (!newCategoryName) {
            window.app.showToast('Il nome della categoria non può essere vuoto.', 'error');
            return;
        }

        $.ajax({
            url: $(this).attr('action'),
            type: 'POST',
            data: { name: newCategoryName },
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    const newCategory = response.category;
                    const newOption = new Option(newCategory.name, newCategory.id, true, true);
                    mainCategorySelect.append(newOption);

                    closeModal();

                    window.app.showToast(response.message, 'success');
                } else {
                    window.app.showToast('Errore: ' + response.message, 'error');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Dettagli errore AJAX:", textStatus, errorThrown);
                window.app.showToast('Errore di comunicazione con il server.', 'error');
            }
        });
    });
});