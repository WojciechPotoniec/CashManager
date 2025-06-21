<!-- Modale per Attivare/Disattivare Categoria -->
<div id="toggle-category-status-modal" class="fixed inset-0 bg-black bg-opacity-50 z-20 hidden">
    <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-full max-w-md">
        <!-- Header -->
        <div class="flex justify-between items-center p-4 border-b">
            <h3 class="text-lg font-semibold">Gestisci Stato Categoria</h3>
            <button id="close-toggle-category-modal-btn" class="text-gray-400 hover:text-gray-600 text-2xl leading-none">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>

        <div class="p-6">
            <form id="toggle-category-status-form" action="api/api_toggle_category_status.php" method="POST">
                <input type="hidden" id="toggle-category-id" name="id">

                <div class="mb-6">
                    <label for="category-to-toggle-select" class="block text-sm font-medium text-gray-700 mb-1">
                        Seleziona Categoria
                    </label>
                    <select id="category-to-toggle-select" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
                        <option value="" disabled selected>Seleziona una categoria...</option>
                    </select>
                </div>

                <fieldset id="category-status-fields" class="hidden">
                    <div class="mb-4">
                        <p class="text-lg font-medium text-center text-gray-800 mb-3" id="selected-category-name"></p>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Imposta Stato</label>
                        <div class="flex items-center justify-center space-x-6 bg-gray-50 p-4 rounded-md">
                            <label class="flex items-center cursor-pointer">
                                <input type="radio" name="isActive" value="1" class="form-radio h-5 w-5 text-green-600">
                                <span class="ml-2 text-sm text-gray-700 font-semibold">Attiva</span>
                            </label>
                            <label class="flex items-center cursor-pointer">
                                <input type="radio" name="isActive" value="0" class="form-radio h-5 w-5 text-red-600">
                                <span class="ml-2 text-sm text-gray-700 font-semibold">Disattiva</span>
                            </label>
                        </div>
                        <p class="text-sm text-gray-500 mt-2">Disattivando una categoria verrà disabilitata dal menu di aggiunta movimenti.<br>
                            Potrai sempre riattivarla da qui.
                        </p>
                    </div>
                </fieldset>

                <div class="flex justify-end pt-4 border-t mt-4">
                    <button type="submit" id="save-status-btn" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled>
                        Salva
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>