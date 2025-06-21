import {showToast} from "./uiHelpers.js";

export function loadCategories() {
    const categorySelects = $('#category-select, #edit-category-select');

    return $.ajax({
        url: 'api/api_get_categories.php',
        type: 'GET',
        dataType: 'json',
        success: function(categories) {
            categorySelects.each(function() {
                const currentSelect = $(this);
                const selectedValue = currentSelect.val();

                const isMainFormSelect = currentSelect.is('#category-select');

                currentSelect.find('option:gt(0)').remove();
                if (currentSelect.find('option[value=""]').length === 0) {
                    currentSelect.find('option').remove();
                }

                categories.forEach(category => {
                    if (isMainFormSelect && category.isActive == 0) {
                        return;
                    }

                    const newOption = new Option(category.name, category.id);

                    if (category.isActive == 0) {
                        $(newOption).prop('disabled', true);
                        newOption.text += ' (disattiva)';
                    }

                    currentSelect.append(newOption);
                });

                if (selectedValue) {
                    currentSelect.val(selectedValue);
                }
            });
        },
        error: function() {
            showToast('Errore nel caricamento delle categorie.', 'error');
        }
    });
}