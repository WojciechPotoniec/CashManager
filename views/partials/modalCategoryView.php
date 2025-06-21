<!--modale di aggiunta categoria-->
<div id="add-category-modal" class="fixed inset-0 bg-black bg-opacity-50 z-10 hidden">
    <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl w-full max-w-sm">
        <!-- Header -->
        <div class="flex justify-between items-center p-4 border-b">
            <h3 class="text-lg font-semibold">Crea una nuova categoria</h3>
            <button id="close-category-modal-btn" class="text-gray-400 hover:text-gray-600 text-2xl leading-none">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>

        <!-- Corpo con il form -->
        <div class="p-4">
            <form id="add-category-form" action="api/api_save_category.php" method="POST">
                <div class="mb-4">
                    <label for="new-category-name" class="block text-sm font-medium text-gray-700 mb-1">Nome Categoria</label>
                    <input type="text" id="new-category-name" name="name" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="Es. Manutenzione">
                </div>
                <!-- Footer con pulsanti -->
                <div class="flex justify-end pt-4 border-t mt-4">
                    <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Crea
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>