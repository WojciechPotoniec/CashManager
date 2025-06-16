<!-- Modale di Conferma Eliminazione -->
<div id="confirm-modal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full hidden z-50">
    <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3 text-center">
            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <!-- Icona di Avviso -->
                <i class="fas fa-exclamation-triangle text-red-600 text-2xl"></i>
            </div>
            <h3 class="text-lg leading-6 font-medium text-gray-900 mt-2" id="confirm-modal-title">Conferma Eliminazione</h3>
            <div class="mt-2 px-7 py-3">
                <p class="text-sm text-gray-500" id="confirm-modal-body">
                    Sei sicuro di voler procedere? L'azione è irreversibile.
                </p>
            </div>
            <div class="items-center px-4 py-3">
                <button id="cancel-delete-btn" class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 mr-2">
                    Annulla
                </button>
                <button id="confirm-delete-btn" class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                    Sì, elimina
                </button>
            </div>
        </div>
    </div>
</div>