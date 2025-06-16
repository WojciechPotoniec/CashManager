/* global $ */

$(document).ready(function() {
    // --- Funzione di inizializzazione principale ---
    function initializeEditModal() {
        // --- ELEMENTI DEL DOM ---
        const editModal = $('#edit-movement-modal');
        const editForm = $('#edit-movement-form');
        const closeBtn = $('#close-edit-modal-btn');
        const cancelBtn = $('#cancel-edit-btn');

        // Otteniamo l'istanza API di DataTables in modo sicuro
        const table = $('#table').DataTable();

        // --- FUNZIONI PER GESTIRE LA MODALE ---
        function openModal(rowData) {
            // 1. Popola il form con i dati della riga
            $('#edit-movement-id').val(rowData.id);

            // 2. Clona le opzioni dal selettore principale per assicurarsi che siano aggiornate
            const mainCategoryOptions = $('#category-select option').clone();
            $('#edit-category-select').empty().append(mainCategoryOptions);

            // 3. Seleziona la categoria corretta e popola gli altri campi
            mainCategoryOptions.val(rowData.category_id);
            $('#edit-incomeAmmount').val(rowData.entrata);
            $('#edit-outputAmmount').val(rowData.uscita);
            $('#edit-note').val(rowData.note);

            // 4. Mostra la modale
            editModal.removeClass('hidden').fadeIn(300);
        }

        function closeModal() {
            editModal.fadeOut(200, function() {
                $(this).addClass('hidden');
            });
            editForm[0].reset(); // Pulisce il form
        }

        // --- COLLEGAMENTO DEGLI EVENTI ---

        // Evento di click sulla penna (delegato al body della tabella)
        $('#table tbody').on('click', '.edit-btn', function() {
            const rowData = table.row($(this).closest('tr')).data();
            if (rowData) {
                openModal(rowData);
            }
        });

        // Eventi per chiudere la modale
        closeBtn.on('click', closeModal);
        cancelBtn.on('click', closeModal);

        // Evita la chiusura se si clicca dentro il contenuto della modale
        editModal.find('.bg-white').on('click', (event) => event.stopPropagation());


        // Evento di submit del form di modifica
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
                        window.app.showToast(response.message, 'success');
                        table.ajax.reload(); // Ricarica la tabella per mostrare i dati aggiornati
                    } else {
                        window.app.showToast(response.message, 'error');
                    }
                },
                error: function() {
                    window.app.showToast('Errore di comunicazione con il server.', 'error');
                }
            });
        });
    }

    // --- CONTROLLO DI SICUREZZA ---
    // Questo è il punto cruciale: assicuriamoci che DataTables sia già stata inizializzata.
    // Se non lo è, aspettiamo l'evento 'init.dt' che viene sparato da DataTables
    // quando ha finito di caricare per la prima volta.
    if ($.fn.dataTable.isDataTable('#table')) {
        // Se la tabella è già pronta, inizializza subito la logica della modale.
        initializeEditModal();
    } else {
        // Altrimenti, aspetta che la tabella sia pronta.
        $('#table').on('init.dt', function() {
            initializeEditModal();
        });
    }
});