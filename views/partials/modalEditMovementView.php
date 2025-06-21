<!-- Modale per la Modifica di un Movimento -->
<div id="edit-movement-modal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full hidden z-10">
    <div class="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
        <div class="flex justify-between items-center border-b pb-3">
            <h3 class="text-xl font-semibold">Modifica Movimento</h3>
            <button id="close-edit-modal-btn" class="text-gray-500 hover:text-gray-800 text-2xl">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
        <div class="mt-4">
            <form id="edit-movement-form" action="api/api_update_movement.php" method="POST">
                <input type="hidden" id="edit-movement-id" name="id">

                <div class="mb-4">
                    <label for="edit-category-select" class="block text-sm font-medium text-gray-700">Categoria</label>
                    <select id="edit-category-select" name="category" class="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm">
                    </select>
                </div>

                <div class="mb-4">
                    <label for="edit-incomeAmmount" class="block text-sm font-medium text-gray-700">Importo Entrata (€)</label>
                    <input type="number" id="edit-incomeAmmount" name="incomeAmmount" class="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md" placeholder="0.00" min="0" step="0.01">
                </div>

                <div class="mb-4">
                    <label for="edit-outputAmmount" class="block text-sm font-medium text-gray-700">Importo Uscita (€)</label>
                    <input type="number" id="edit-outputAmmount" name="outputAmmount" class="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md" placeholder="0.00" min="0" step="0.01">
                </div>

                <div class="mb-4">
                    <label for="edit-note" class="block text-sm font-medium text-gray-700">Note (opzionale)</label>
                    <textarea id="edit-note" name="note" rows="3" class="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"></textarea>
                </div>

                <div class="flex justify-end pt-4 border-t mt-4">
                    <button type="button" id="cancel-edit-btn" class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded mr-2">
                        Annulla
                    </button>
                    <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Salva Modifiche
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>