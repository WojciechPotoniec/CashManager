import {showToast} from "../modules/uiHelpers.js";

export function initDeleteCategoryModal() {
    const openDeleteModalBtn = $('#open-delete-category-modal-btn');
    const deleteCategoryModal = $('#delete-category-modal');
    const closeDeleteModalBtn = $('#close-delete-category-modal-btn');
    const deleteCategoryForm = $('#delete-category-form');
    const deleteCategorySelect = $('#category-to-delete-select');
    const mainCategorySelect = $('#category-select');

    function populateDeleteSelect() {
        deleteCategorySelect.find('option:gt(0)').remove();
        mainCategorySelect.find('option').each(function () {
            if ($(this).val()) {
                deleteCategorySelect.append($(this).clone());
            }
        });
    }

    function openDeleteModal() {
        populateDeleteSelect();
        deleteCategoryModal.removeClass('hidden').fadeIn(300);
        setTimeout(() => deleteCategorySelect.focus(), 300);
    }

    function closeDeleteModal() {
        deleteCategoryModal.fadeOut(200, function () {
            $(this).addClass('hidden');
        });
        deleteCategoryForm[0].reset();
    }

    openDeleteModalBtn.on('click', openDeleteModal);
    closeDeleteModalBtn.on('click', closeDeleteModal);

    deleteCategoryForm.on('submit', function (event) {
        event.preventDefault();

        const categoryIdToDelete = deleteCategorySelect.val();

        if (!categoryIdToDelete) {
            showToast('Per favore, seleziona una categoria da eliminare.', 'error');
            return;
        }

        $.ajax({
            url: $(this).attr('action'),
            type: 'POST',
            data: {id: categoryIdToDelete},
            dataType: 'json',
            success: function (response) {
                if (response.success) {
                    $('option[value="' + categoryIdToDelete + '"]').remove();

                    closeDeleteModal();

                    showToast(response.message, 'success');
                } else {
                    showToast('Errore: ' + response.message, 'error');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("Dettagli errore AJAX:", textStatus, errorThrown);
                showToast('Errore di comunicazione con il server.', 'error');
            }
        });
    });
};