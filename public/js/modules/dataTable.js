import { showToast, formatCurrency, updateBalances } from "./uiHelpers.js";

export function initDataTable() {
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
                    updateBalances(responseData.balances);
                }
                return responseData.tableData || [];
            }
        },
        columns: [
            {"data": "id"},
            {"data": "data"},
            {
                "data": "category",
                "render": function(data, type, row) {
                    if (type === 'display') {
                        if (row.category_isActive == 0) {
                            return data + ' <span class="text-gray-500 italic">(disattivata)</span>';
                        }
                    }
                    return data;
                }
            },
            {"data": "entrata",
                "render": function(data, type, row) {
                    if (type === 'display') {
                        return parseFloat(data) > 0 ? formatCurrency(data) : '';
                    }
                    return data;
                }},
            {"data": "uscita",
                "render": function(data, type, row) {
                    if (type === 'display') {
                        return parseFloat(data) > 0 ? formatCurrency(data) : '';
                    }
                    return data;
                }},
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
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).addClass('!text-left');

                    if (parseFloat(cellData) > 0){
                        $(td).addClass('font-semibold text-green-600');
                    }
                }
            },
            {
                targets: 4,
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).addClass('!text-left');

                    if (parseFloat(cellData) > 0){
                        $(td).addClass('font-semibold text-red-600');
                    }
                }
            },
            {
                targets: 5,
                className: "max-sm:!whitespace-normal"
            },
            {
                targets: 6,
                className: 'text-left md:text-center',
                orderable: false
            }
        ],
        language: {

            "infoFiltered": "(filtrati da _MAX_ elementi totali)",
            "infoThousands": ".",
            "loadingRecords": "Caricamento...",
            "processing": "Elaborazione...",
            "search": "",
            "searchPlaceholder": "Cerca movimento...",
            "paginate": {
                "first": '<i class="fa-solid fa-angles-left"></i>',
                "last": '<i class="fa-solid fa-angles-right"></i>',
                "next": '<i class="fa-solid fa-chevron-right"></i>',
                "previous": '<i class="fa-solid fa-chevron-left"></i>'
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
        },
        classes: {
            "paging": {
                "button": "px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 mx-1",
                "button_active": "bg-blue-500 border-blue-500 text-white hover:bg-blue-600",
                "button_disabled": "bg-gray-100 text-gray-400 cursor-not-allowed"
            }
        },

        initComplete: function () {
            const searchContainer = $('div.dt-search');
            const searchInput = $('#dt-search-0');

            searchContainer.addClass('relative max-sm:w-[165px]');

            searchInput.removeClass('dt-input').addClass(
                'w-full px-3 py-1.5 pl-10 border border-gray-300 rounded-md shadow-sm ' +
                'focus:outline-none focus:ring-blue-500 focus:border-blue-500'
            );
        }
    });

    table.on('responsive-display', function (e, datatable, row, showHide, update) {
        $(row.node()).addClass('!bg-gray-100');
    });

    table.on('responsive-hide', function (e, datatable, rowIdx, columns) {
        const rowNode = $(datatable.row(rowIdx).node());
        rowNode.removeClass('!bg-gray-100');
    });

    // --- INIZIO SEZIONE DI ELIMINAZIONE ---

    const confirmModal = $('#confirm-modal');
    const confirmDeleteBtn = $('#confirm-delete-btn');
    const cancelDeleteBtn = $('#cancel-delete-btn');
    let movementIdToDelete = null; // Variabile per memorizzare l'ID da eliminare

    $('#table tbody').on('click', '.delete-btn', function (event) {
        event.preventDefault();
        const rowData = table.row($(this).closest('tr')).data();
        movementIdToDelete = rowData.id; // Salva l'ID

        $('#confirm-modal-body').text(`Sei sicuro di voler eliminare il movimento?`);

        confirmModal.removeClass('hidden');
    });

    confirmDeleteBtn.on('click', function () {
        if (movementIdToDelete) {
            $.ajax({
                url: 'api/api_delete_movement.php',
                type: 'POST',
                data: {id: movementIdToDelete},
                dataType: 'json',
                success: function (response) {
                    if (response.success) {
                        table.ajax.reload();
                        showToast(response.message || 'Movimento eliminato!', 'success');
                    } else {
                        showToast(response.message || 'Impossibile eliminare.', 'error');
                    }
                },
                error: function () {
                    showToast('Errore durante l\'eliminazione.', 'error');
                },
                complete: function () {
                    confirmModal.addClass('hidden');
                    movementIdToDelete = null;
                }
            });
        }
    });

    cancelDeleteBtn.on('click', function () {
        confirmModal.addClass('hidden');
        movementIdToDelete = null;
    });

    return table;
};