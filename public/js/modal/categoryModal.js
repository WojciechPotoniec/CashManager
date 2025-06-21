import { showToast } from '../modules/uiHelpers.js';
import { loadCategories } from '../modules/categoryService.js';

export function initCategoryModal() {

    const openModalBtn = $('#open-category-modal-btn');
    const categoryModal = $('#add-category-modal');
    const closeModalBtn = $('#close-category-modal-btn');
    const categoryForm = $('#add-category-form');
    const categoryNameInput = $('#new-category-name');

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

    openModalBtn.on('click', openModal);
    closeModalBtn.on('click', closeModal);

    categoryForm.on('submit', function(event) {
        event.preventDefault();

        const newCategoryName = categoryNameInput.val().trim();

        // Validazione
        if (!newCategoryName) {
            showToast('Il nome della categoria non può essere vuoto.', 'error');
            return;
        }

        $.ajax({
            url: $(this).attr('action'),
            type: 'POST',
            data: { name: newCategoryName },
            dataType: 'json',
            success: function(response) {
                if (response.success) {

                    loadCategories().done(function() {
                        const newCategoryId = response.category.id;
                        $('.category-select-js').val(newCategoryId);
                    });

                    closeModal();
                    showToast(response.message, 'success');
                } else {
                    showToast('Errore: ' + response.message, 'error');
                }
            },
            error: function() {
                showToast('Errore di comunicazione con il server.', 'error');
            }
        });
    });
}