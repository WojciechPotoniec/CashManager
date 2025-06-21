import { loadCategories } from '../modules/categoryService.js';
import { showToast } from "../modules/uiHelpers.js";

export function initToggleCategoryStatusModal() {

    const openModalBtn = $('#open-toggle-category-modal-btn');
    const categoryModal = $('#toggle-category-status-modal');
    const closeModalBtn = $('#close-toggle-category-modal-btn');
    const form = $('#toggle-category-status-form');
    const categorySelect = $('#category-to-toggle-select');
    const statusFields = $('#category-status-fields');
    const categoryIdInput = $('#toggle-category-id');
    const categoryNameDisplay = $('#selected-category-name');
    const saveButton = $('#save-status-btn');

    function openModal() {
        populateSelect();
        categoryModal.removeClass('hidden').fadeIn(300);
    }

    function closeModal() {
        categoryModal.fadeOut(200, function() { $(this).addClass('hidden'); });
        form[0].reset();
        statusFields.addClass('hidden');
        saveButton.prop('disabled', true);
    }
    function populateSelect() {
        categorySelect.find('option:gt(0)').remove();
        $.ajax({
            url: 'api/api_get_categories.php',
            type: 'GET',
            dataType: 'json',
            success: function(categories) {
                categories.forEach(function(category) {
                    const optionText = category.name + (category.isActive == 0 ? ' (Disattivata)' : '');
                    categorySelect.append(new Option(optionText, category.id));
                });
            }
        });
    }


    openModalBtn.on('click', openModal);
    closeModalBtn.on('click', closeModal);

    categorySelect.on('change', function() {
        const categoryId = $(this).val();
        if (!categoryId) {
            statusFields.addClass('hidden');
            saveButton.prop('disabled', true);
            return;
        }

        $.ajax({
            url: 'api/api_get_category_details.php',
            type: 'GET',
            data: { id: categoryId },
            dataType: 'json',
            success: function(category) {
                categoryIdInput.val(category.id);
                categoryNameDisplay.text(category.name);
                $(`input[name="isActive"][value="${category.isActive}"]`).prop('checked', true);

                statusFields.removeClass('hidden');
                saveButton.prop('disabled', false);
            }
        });
    });

    form.on('submit', function(event) {
        event.preventDefault();

        $.ajax({
            url: $(this).attr('action'),
            type: 'POST',
            data: $(this).serialize(),
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    showToast(response.message, 'success');

                    loadCategories();

                    closeModal();
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