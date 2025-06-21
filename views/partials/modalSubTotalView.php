<!--modale di aggiunta e aggiornamento subtotale-->
<div id="add-subtotal-modal" class="fixed inset-0 bg-black bg-opacity-50 z-10 hidden">
    <!-- Contenitore della modale, centrato -->
    <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-full max-w-sm">
        <!-- Header -->
        <div class="flex justify-between items-center p-4 border-b">
            <h3 class="text-lg font-semibold">Gestisci Subtotale</h3>
            <button id="close-subtotal-modal-btn" type="button" class="text-gray-400 hover:text-gray-600 text-2xl leading-none">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
        <div class="flex flex-col items-center border-b bg-gray-100">
            <span>Totale Accantonato</span>
            <p id="subTotalBalance" class="text-lg font-bold text-blue-600"></p>
        </div>

        <!-- Corpo con il form -->
        <div class="p-6">
            <form id="subtotal-form">
                <div class="mb-4">
                    <label for="subtotal-amount" class="block text-sm font-medium text-gray-700 mb-1">Importo (€)</label>
                    <input type="number" id="subtotal-amount" name="subtotal"
                           class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                           placeholder="0.00" min="0" step="0.01">
                </div>

                <!-- Footer con pulsanti -->
                <div class="flex justify-end">
                    <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Salva Importo
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>