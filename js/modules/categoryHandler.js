/* global $ */

// Inizializza il namespace se non esiste
window.app = window.app || {};

/**
 * Carica le categorie dal server e le popola nella select.
 * @param {number|null} selectedCategoryId - L'ID della categoria da preselezionare (opzionale).
 */
window.app.loadCategories = function(selectedCategoryId = null) {
    const categorySelect = $('#category-select');
    categorySelect.find('option:not(:first)').remove(); // Pulisce le opzioni

    $.ajax({
        url: 'api/api_get_categories.php',
        type: 'GET',
        dataType: 'json',
        success: function (categories) {
            categories.forEach(function (category) {
                categorySelect.append(new Option(category.name, category.id));
            });
            if (selectedCategoryId) {
                categorySelect.val(selectedCategoryId);
            }
        },

        error: function () {
            window.app.showToast('Errore durante il caricamento delle categorie.', 'error');
        }
    });
};

/**
 * Inizializza i gestori di eventi per la select delle categorie.
 */
window.app.initCategoryHandler = function() {
    const categorySelect = $('#category-select');

    // Carica le categorie all'avvio
    window.app.loadCategories();

    // Gestione popolamento automatico del form
    categorySelect.on('change', function() {
        const categoryId = $(this).val();
        $('#incomeAmmount, #outputAmmount, #note').val(''); // Modo compatto per pulire i campi

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
                    window.app.showToast('Errore nel recupero dell\'ultimo movimento.', 'error');
                }
            });
        }
    });
};