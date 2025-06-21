/* global $ */

import { loadCategories } from './categoryService.js';
import { showToast } from './uiHelpers.js';

export function initCategoryHandler() {

    const categorySelect = $('#category-select');

    loadCategories().done(function() {});

    categorySelect.on('change', function() {
        const categoryId = $(this).val();
        $('#incomeAmmount, #outputAmmount, #note').val('');

        if (categoryId) {
            $.ajax({
                url: 'api/api_get_last_movement_by_category.php',
                type: 'GET',
                data: { category_id: categoryId },
                dataType: 'json',
                success: function(response) {
                    if (response.success && response.data) {
                        const last = response.data;
                        if (parseFloat(last.entrata) > 0) $('#incomeAmmount').val(last.entrata);
                        if (parseFloat(last.uscita) > 0) $('#outputAmmount').val(last.uscita);
                        if (last.note) $('#note').val(last.note);
                    }
                },
                error: function() {
                    showToast('Errore nel recupero dell\'ultimo movimento.', 'error');
                }
            });
        }
    });
}