export function initMovementForm(table) {
    const movementForm = $('#add-movement-form');
    const categorySelect = $('#category-select');

    movementForm.on('submit', function (event) {
        event.preventDefault();
        $.ajax({
            url: $(this).attr('action'),
            type: 'POST',
            data: $(this).serialize(),
            dataType: 'json',
            success: function (response) {
                if (response.success) {
                    window.app.showToast(response.message, 'success');
                    movementForm[0].reset();
                    categorySelect.val('');
                    table.ajax.reload(null, false);
                } else {
                    window.app.showToast(response.message, 'error');
                }
            },
            error: function () {
                window.app.showToast('Errore di comunicazione con il server.', 'error');
            }
        });
    });

    $('#cancel-btn').on('click', function () {
        movementForm[0].reset();
        categorySelect.val('');
    });
};