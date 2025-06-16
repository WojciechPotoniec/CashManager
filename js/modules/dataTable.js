// Inizializza il namespace se non esiste
window.app = window.app || {};

/**
 * Inizializza la tabella DataTables e gestisce gli eventi correlati.
 * @returns {DataTables.Api} L'istanza dell'API di DataTables.
 */
window.app.initDataTable = function () {
    // noinspection JSCheckFunctionSignatures
    const table = $('#table').DataTable({
        responsive: true,
        layout: {
            topStart: {
                buttons: [{
                    extend: 'excelHtml5',
                    text: 'Excel',
                    className: 'px-3 py-1.5 border border-blue-300 rounded-lg shadow-md text-sm font-medium text-gray-700 bg-blue hover:bg-blue-100'
                }]
            },
            topEnd: 'search'
        },
        ajax: {
            url: "api/api_dati.php",
            dataSrc: function (json) {
                const responseData = json.data;
                if (responseData && responseData.balances) {
                    window.app.updateBalances(responseData.balances);
                }
                return responseData.tableData || [];
            }
        },
        columns: [
            {"data": "id"},
            {"data": "data"},
            {"data": "category"},
            {"data": "entrata"},
            {"data": "uscita"},
            {"data": "note"},
            {
                "data": null,
                "defaultContent":
                    '<button class="edit-btn p-1 mr-2" title="Modifica"><i class="fa-solid fa-pencil text-lg hover:text-blue-600"></i></button>' +
                    '<button class="delete-btn"><i class="fa-solid fa-trash hover:text-red-600 text-lg text-center"></i></button>',
                "orderable": false,
            }
        ],
        columnDefs: [
            {responsivePriority: 1, targets: 4}, // Uscite
            {responsivePriority: 2, targets: 3}, // Entrate
            {responsivePriority: 3, targets: 2}, // Categoria
            {responsivePriority: 4, targets: 6}, // Azioni
            {responsivePriority: 5, targets: 1}, // Data
            {responsivePriority: 6, targets: 5}, // Note
            {responsivePriority: 7, targets: 0}, // ID

            {
                targets: 0,
                className: "!text-left"
            },
            {
                targets: 3,
                className: "!text-left"
            },
            {
                targets: 5,
                className: "max-sm:!whitespace-normal"
            },
            {
                targets: 6, // Seleziona di nuovo la colonna Azioni
                className: 'text-left md:text-center',
                orderable: false
            }
        ],
        language: {

            "infoFiltered": "(filtrati da _MAX_ elementi totali)",
            "infoThousands": ".",
            "loadingRecords": "Caricamento...",
            "processing": "Elaborazione...",
            "search": "Cerca:",
            "paginate": {
                "first": "Inizio",
                "previous": "Precedente",
                "next": "Successivo",
                "last": "Fine"
            },
            "aria": {
                "sortAscending": ": attiva per ordinare la colonna in ordine crescente",
                "sortDescending": ": attiva per ordinare la colonna in ordine decrescente"
            },
            "autoFill": {
                "cancel": "Annulla",
                "fill": "Riempi tutte le celle con <i>%d<\/i>",
                "fillHorizontal": "Riempi celle orizzontalmente",
                "fillVertical": "Riempi celle verticalmente"
            },
            "buttons": {
                "collection": "Collezione <span class=\"ui-button-icon-primary ui-icon ui-icon-triangle-1-s\"><\/span>",
                "colvis": "Visibilità Colonna",
                "colvisRestore": "Ripristina visibilità",
                "copy": "Copia",
                "copyKeys": "Premi ctrl o u2318 + C per copiare i dati della tabella nella tua clipboard di sistema.<br \/><br \/>Per annullare, clicca questo messaggio o premi ESC.",
                "copySuccess": {
                    "1": "Copiata 1 riga nella clipboard",
                    "_": "Copiate %d righe nella clipboard"
                },
                "copyTitle": "Copia nella Clipboard",
                "csv": "CSV",
                "excel": "Excel",
                "pageLength": {
                    "-1": "Mostra tutte le righe",
                    "_": "Mostra %d righe"
                },
                "pdf": "PDF",
                "print": "Stampa",
                "createState": "Crea stato",
                "removeAllStates": "Rimuovi tutti gli stati",
                "removeState": "Rimuovi",
                "renameState": "Rinomina",
                "savedStates": "Salva stato",
                "stateRestore": "Ripristina stato",
                "updateState": "Aggiorna"
            },
            "emptyTable": "Nessun dato disponibile nella tabella",
            "info": "Risultati da _START_ a _END_ di _TOTAL_ elementi",
            "infoEmpty": "Risultati da 0 a 0 di 0 elementi",
            "lengthMenu": "Mostra _MENU_ elementi",
            "searchBuilder": {
                "add": "Aggiungi Condizione",
                "button": {
                    "0": "Generatore di Ricerca",
                    "_": "Generatori di Ricerca (%d)"
                },
                "clearAll": "Pulisci Tutto",
                "condition": "Condizione",
                "conditions": {
                    "date": {
                        "after": "Dopo",
                        "before": "Prima",
                        "between": "Tra",
                        "empty": "Vuoto",
                        "equals": "Uguale A",
                        "not": "Non",
                        "notBetween": "Non Tra",
                        "notEmpty": "Non Vuoto"
                    },
                    "number": {
                        "between": "Tra",
                        "empty": "Vuoto",
                        "equals": "Uguale A",
                        "gt": "Maggiore Di",
                        "gte": "Maggiore O Uguale A",
                        "lt": "Minore Di",
                        "lte": "Minore O Uguale A",
                        "not": "Non",
                        "notBetween": "Non Tra",
                        "notEmpty": "Non Vuoto"
                    },
                    "string": {
                        "contains": "Contiene",
                        "empty": "Vuoto",
                        "endsWith": "Finisce Con",
                        "equals": "Uguale A",
                        "not": "Non",
                        "notEmpty": "Non Vuoto",
                        "startsWith": "Inizia Con",
                        "notContains": "Non Contiene",
                        "notStartsWith": "Non Inizia Con",
                        "notEndsWith": "Non Finisce Con"
                    },
                    "array": {
                        "equals": "Uguale A",
                        "empty": "Vuoto",
                        "contains": "Contiene",
                        "not": "Non",
                        "notEmpty": "Non Vuoto",
                        "without": "Senza"
                    }
                },
                "data": "Dati",
                "deleteTitle": "Elimina regola filtro",
                "leftTitle": "Criterio di Riduzione Rientro",
                "logicAnd": "E",
                "logicOr": "O",
                "rightTitle": "Criterio di Aumento Rientro",
                "title": {
                    "0": "Generatore di Ricerca",
                    "_": "Generatori di Ricerca (%d)"
                },
                "value": "Valore"
            },
            "searchPanes": {
                "clearMessage": "Pulisci Tutto",
                "collapse": {
                    "0": "Pannello di Ricerca",
                    "_": "Pannelli di Ricerca (%d)"
                },
                "count": "{total}",
                "countFiltered": "{shown} ({total})",
                "emptyPanes": "Nessun Pannello di Ricerca",
                "loadMessage": "Caricamento Pannello di Ricerca",
                "title": "Filtri Attivi - %d",
                "showMessage": "Mostra tutto",
                "collapseMessage": "Espandi tutto"
            },
            "select": {
                "cells": {
                    "1": "1 cella selezionata",
                    "_": "%d celle selezionate"
                },
                "columns": {
                    "1": "1 colonna selezionata",
                    "_": "%d colonne selezionate"
                },
                "rows": {
                    "1": "1 riga selezionata",
                    "_": "%d righe selezionate"
                }
            },
            "zeroRecords": "Nessun elemento corrispondente trovato",
            "datetime": {
                "amPm": [
                    "am",
                    "pm"
                ],
                "hours": "ore",
                "minutes": "minuti",
                "next": "successivo",
                "previous": "precedente",
                "seconds": "secondi",
                "unknown": "sconosciuto",
                "weekdays": [
                    "Dom",
                    "Lun",
                    "Mar",
                    "Mer",
                    "Gio",
                    "Ven",
                    "Sab"
                ],
                "months": [
                    "Gennaio",
                    "Febbraio",
                    "Marzo",
                    "Aprile",
                    "Maggio",
                    "Giugno",
                    "Luglio",
                    "Agosto",
                    "Settembre",
                    "Ottobre",
                    "Novembre",
                    "Dicembre"
                ]
            },
            "editor": {
                "close": "Chiudi",
                "create": {
                    "button": "Nuovo",
                    "submit": "Aggiungi",
                    "title": "Aggiungi nuovo elemento"
                },
                "edit": {
                    "button": "Modifica",
                    "submit": "Modifica",
                    "title": "Modifica elemento"
                },
                "error": {
                    "system": "Errore del sistema."
                },
                "multi": {
                    "info": "Gli elementi selezionati contengono valori diversi. Per modificare e impostare tutti gli elementi per questa selezione allo stesso valore, premi o clicca qui, altrimenti ogni cella manterrà il suo valore attuale.",
                    "noMulti": "Questa selezione può essere modificata individualmente, ma non se fa parte di un gruppo.",
                    "restore": "Annulla le modifiche",
                    "title": "Valori multipli"
                },
                "remove": {
                    "button": "Rimuovi",
                    "confirm": {
                        "_": "Sei sicuro di voler cancellare %d righe?",
                        "1": "Sei sicuro di voler cancellare 1 riga?"
                    },
                    "submit": "Rimuovi",
                    "title": "Rimuovi"
                }
            },
            "thousands": ".",
            "decimal": ",",
            "stateRestore": {
                "creationModal": {
                    "button": "Crea",
                    "columns": {
                        "search": "Colonna Cerca",
                        "visible": "Colonna Visibilità"
                    },
                    "name": "Nome:",
                    "order": "Ordinamento",
                    "paging": "Paginazione",
                    "scroller": "Scorri posizione",
                    "search": "Ricerca",
                    "searchBuilder": "Form di Ricerca",
                    "select": "Seleziona",
                    "title": "Crea nuovo Stato",
                    "toggleLabel": "Includi:"
                },
                "duplicateError": "Nome stato già presente",
                "emptyError": "Il nome è obbligatorio",
                "emptyStates": "Non ci sono stati salvati",
                "removeConfirm": "Sei sicuro di eliminare lo Stato %s?",
                "removeError": "Errore durante l'eliminazione dello Stato",
                "removeJoiner": "e",
                "removeSubmit": "Elimina",
                "removeTitle": "Elimina Stato",
                "renameButton": "Rinomina",
                "renameLabel": "Nuovo nome per %s:",
                "renameTitle": "Rinomina Stato"
            },

            "search": "", // Rimuove completamente l'etichetta "Cerca:"
            "searchPlaceholder": "Cerca movimento...", // Imposta il testo del placeholder
            "paginate": {
                "first": '<i class="fa-solid fa-angles-left"></i>',
                "last": '<i class="fa-solid fa-angles-right"></i>',
                "next": '<i class="fa-solid fa-chevron-right"></i>',
                "previous": '<i class="fa-solid fa-chevron-left"></i>'
            },
        },
        classes: {
            "paging": {
                "button": "px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 mx-1",
                "button_active": "bg-blue-500 border-blue-500 text-white hover:bg-blue-600",
                "button_disabled": "bg-gray-100 text-gray-400 cursor-not-allowed"
            }
        },
        initComplete: function () {
            // Selezioniamo il contenitore e l'input della ricerca
            // Ora siamo sicuri che questi elementi esistono nel DOM.
            const searchContainer = $('div.dt-search');
            const searchInput = $('#dt-search-0'); // Modo più sicuro per trovare l'input

            // 1. Personalizziamo il CONTENITORE
            searchContainer.addClass('relative max-sm:w-[165px]');

            // 2. Personalizziamo l'INPUT
            searchInput.removeClass('dt-input').addClass(
                'w-full px-3 py-1.5 pl-10 border border-gray-300 rounded-md shadow-sm ' +
                'focus:outline-none focus:ring-blue-500 focus:border-blue-500'
            );
        }
    });

    // 1. ASCOLTA L'EVENTO QUANDO UNA RIGA FIGLIO VIENE MOSTRATA
    // Questo evento viene sparato dopo che la riga figlio è stata creata e inserita nel DOM.
    table.on('responsive-display', function (e, datatable, row) {
        // 'row.node()' è l'elemento <tr> della riga principale che è stata aperta.
        // Aggiungiamo uno sfondo grigio chiaro a questa riga.
        $(row.node()).addClass('!bg-gray-100');
    });

    // 2. ASCOLTA L'EVENTO QUANDO UNA RIGA FIGLIO VIENE NASCOSTA
    // Questo evento viene sparato quando l'utente clicca di nuovo per chiudere i dettagli.
    table.on('responsive-hide', function (e, datatable, rowIdx) {
        // Otteniamo la riga usando il suo indice
        const rowNode = $(datatable.row(rowIdx).node());
        // Rimuoviamo la classe di sfondo per ripristinare l'aspetto originale
        // (e permettere allo "zebra striping" di funzionare di nuovo).
        rowNode.removeClass('!bg-gray-100');
    });

    // --- INIZIO SEZIONE DI ELIMINAZIONE ---

    // Selezioniamo gli elementi della modale di conferma
    const confirmModal = $('#confirm-modal');
    const confirmDeleteBtn = $('#confirm-delete-btn');
    const cancelDeleteBtn = $('#cancel-delete-btn');
    let movementIdToDelete = null; // Variabile per memorizzare l'ID da eliminare

    // 1. Quando l'utente clicca sul cestino nella tabella
    $('#table tbody').on('click', '.delete-btn', function (event) {
        event.preventDefault();
        const rowData = table.row($(this).closest('tr')).data();
        movementIdToDelete = rowData.id; // Salva l'ID

        // Imposta un testo dinamico per la modale
        $('#confirm-modal-body').text(`Sei sicuro di voler eliminare il movimento?`);

        // Mostra la modale di conferma
        confirmModal.removeClass('hidden');
    });

    // 2. Quando l'utente clicca il pulsante "Sì, elimina" nella modale
    confirmDeleteBtn.on('click', function () {
        if (movementIdToDelete) {
            $.ajax({
                url: 'api/api_delete_movement.php',
                type: 'POST',
                data: {id: movementIdToDelete},
                dataType: 'json',
                success: function (response) {
                    if (response.success) {
                        // Ricarichiamo i dati. Questo riesegue la chiamata AJAX e aggiorna
                        // sia la tabella che i saldi tramite la funzione dataSrc.
                        table.ajax.reload();
                        window.app.showToast(response.message || 'Movimento eliminato!', 'success');
                    } else {
                        window.app.showToast(response.message || 'Impossibile eliminare.', 'error');
                    }
                },
                error: function () {
                    window.app.showToast('Errore durante l\'eliminazione.', 'error');
                },
                complete: function () {
                    // Nasconde la modale e resetta l'ID in ogni caso
                    confirmModal.addClass('hidden');
                    movementIdToDelete = null;
                }
            });
        }
    });

    // 3. Quando l'utente clicca "Annulla" o la X per chiudere la modale
    cancelDeleteBtn.on('click', function () {
        confirmModal.addClass('hidden');
        movementIdToDelete = null;
    });


    // // Gestione resize finestra (invariato)
    // $(window).on('resize', function () {
    //     setTimeout(function () {
    //         table.columns.adjust().responsive.recalc();
    //     }, 150);
    // });

    return table;
};