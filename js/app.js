/* global $ */

// Esegue il codice quando il DOM è pronto
$(document).ready(function () {

    // Inizializza il namespace globale
    window.app = window.app || {};

    // 1. Inizializza il gestore delle categorie
    window.app.initCategoryHandler();

    // 2. Inizializza la DataTables e ottiene l'istanza
    const table = window.app.initDataTable();

    // 3. Inizializza il form dei movimenti, passando l'istanza della tabella
    window.app.initMovementForm(table);
});