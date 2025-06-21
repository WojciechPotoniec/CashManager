<div id="delete-category-modal" class="fixed inset-0 bg-black bg-opacity-50 z-10 hidden">
    <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-full max-w-md">
        <!-- Header -->
        <div class="flex justify-between items-center p-4 border-b">
            <h3 class="text-lg font-semibold text-red-700">Elimina una categoria</h3>
            <button id="close-delete-category-modal-btn" class="text-gray-400 hover:text-gray-600 text-2xl leading-none">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>

        <!-- Corpo con il form -->
        <div class="p-4">
            <form id="delete-category-form" action="api/api_delete_category.php" method="POST">
                <div class="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
                    <p class="font-bold">Attenzione!</p>
                    <p class="text-sm">L'eliminazione di una categoria è un'azione irreversibile.</p>
                </div>
                <div>
                    <label for="category-to-delete-select" class="block text-sm font-medium text-gray-700 mb-1">
                        Seleziona Categoria da Eliminare
                    </label>
                    <select id="category-to-delete-select" name="id"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
                        <option value="" disabled selected>Seleziona una categoria...</option>
                    </select>
                </div>
                <div class="flex justify-end pt-4 border-t mt-4">
                    <button type="submit" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Elimina
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>