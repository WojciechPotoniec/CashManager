<?php
require_once '../src/auth_check.php';
?>

<!DOCTYPE html>
<html lang="IT">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">


    <!--FontAwesome 6.7.2 icon-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
          crossorigin="anonymous" referrerpolicy="no-referrer"/>

    <link href="https://cdn.datatables.net/2.3.2/css/dataTables.dataTables.css" rel="stylesheet"
          integrity="sha384-OVK8p9FoYefWFLKzZNnYu64ib5Edt8HVy83uFLC5Jo3krQzMsPP9xyhmh5W0JzNg" crossorigin="anonymous">

    <link href="https://cdn.datatables.net/buttons/3.2.3/css/buttons.dataTables.css" rel="stylesheet"
          integrity="sha384-eq9iwSo+gJGpFqhqvOQtZrCH9wSnp2vAHRpVgBT36anf82QEj/c9boJipOpNLE4q" crossorigin="anonymous">

    <link href="https://cdn.datatables.net/responsive/3.0.4/css/responsive.dataTables.css" rel="stylesheet"
          integrity="sha384-inDoREwjvy5La3vgUWcIczhlGcfXAt1V1DsIU/yHRTbfL3W/HfMnReyF4xwS7S+x" crossorigin="anonymous">

    <link rel="stylesheet" href="css/app.css">

    <title>Cash Manager</title>
</head>
<body>
<main class="bg-gray-200 min-h-screen">
    <div class="flex justify-center pt-4">
        <!-- Notifica di Successo -->
        <div id="success-toast"
             class="bg-green-500 text-white p-4 rounded-lg shadow-lg hidden flex items-center space-x-3 z-20">
            <i class="fas fa-check-circle text-xl"></i>
            <span id="success-toast-message" class="font-semibold"></span>
        </div>

        <!-- Notifica di Errore -->
        <div id="error-toast"
             class="bg-red-600 text-white p-4 rounded-lg shadow-lg hidden flex items-center space-x-3 z-20">
            <i class="fas fa-exclamation-triangle text-xl"></i>
            <span id="error-toast-message" class="font-semibold"></span>
        </div>
    </div>

    <div class="flex max-md:justify-center sm:justify-end px-5 max-sm:pt-4 capitalize">
        <a class="px-3 py-2 md:text-sm max-sm:px-4 max-sm:py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
           href="logout.php">termina sessione</a>
    </div>

    <div class="md:flex justify-center gap-6 p-5">
        <div class="w-full md:max-w-xs space-y-6">
            <!--card riepilogo saldo-->
            <div class="bg-white p-6 rounded-lg shadow-lg">
                <h1 class="text-2xl font-bold text-center">Cash Manager</h1>
                <div class="border-t my-4"></div>
                <div class="flex justify-between items-start">
                    <!-- Titolo e Totale -->
                    <div>
                        <h2 class="text-xl font-semibold text-gray-800 whitespace-nowrap">Riepilogo Saldo</h2>
                        <p id="totalBalance" class="text-2xl font-bold text-blue-600 mt-2"></p>
                    </div>
                    <button id="open-subtotal-modal-btn"
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        subtotale
                    </button>
                </div>
            </div>

            <!--form di inserimento movimento-->
            <div class="bg-white rounded-lg shadow-lg">
                <h3 class="text-xl text-center p-4 border-b font-semibold whitespace-nowrap">Aggiungi un nuovo
                    movimento</h3>
                <div class="flex flex-col items-center mt-1">
                    <h5 class="font-bold mb-2">Gestisci Categorie:</h5>
                    <div class="flex justify-center items-start space-x-6">
                        <div class="flex flex-col items-center">
                            <span class="text-sm font-semibold">Aggiungi</span>
                            <button type="button" id="open-category-modal-btn"
                                    class="text-blue-500 hover:text-blue-700">
                                <i class="fa-solid fa-square-plus text-2xl"></i>
                            </button>
                        </div>
                        <div class="flex flex-col items-center">
                            <span class="text-sm font-semibold">Modifica</span>
                            <button type="button" id="open-toggle-category-modal-btn"
                                    class="text-yellow-500 hover:text-yellow-600">
                                <i class="fa-solid fa-square-pen text-2xl"></i>
                            </button>
                        </div>
                        <div class="flex flex-col items-center">
                            <span class="text-sm font-semibold">Elimina</span>
                            <button type="button" id="open-delete-category-modal-btn"
                                    class="text-red-500 hover:text-red-700">
                                <i class="fa-solid fa-square-minus text-2xl"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="py-4 px-6">
                    <form id="add-movement-form" action="api/api_save_movement.php" method="POST">
                        <div class="mb-4">
                            <div class="mb-1">
                                <label for="category-select"
                                       class="block text-sm font-medium text-gray-700">Categoria</label>
                            </div>
                            <select id="category-select" name="category"
                                    class="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                                <option value="" disabled selected>Seleziona categoria...</option>
                            </select>
                        </div>

                        <div class="mb-4">
                            <label for="incomeAmmount" class="block text-sm font-medium text-gray-700 mb-1">Importo
                                Entrata (€)</label>
                            <input type="number" id="incomeAmmount" name="incomeAmmount"
                                   class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                   placeholder="0.00" min="0" step="0.01">
                        </div>

                        <div class="mb-4">
                            <label for="outputAmmount" class="block text-sm font-medium text-gray-700 mb-1">Importo
                                Uscita (€)</label>
                            <input type="number" id="outputAmmount" name="outputAmmount"
                                   class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                   placeholder="0.00" min="0" step="0.01">
                        </div>

                        <div class="mb-4">
                            <label for="note" class="block text-sm font-medium text-gray-700 mb-1">Note
                                (opzionale)</label>
                            <textarea id="note" name="note" rows="3"
                                      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                      placeholder="Dettagli aggiuntivi..."></textarea>
                        </div>

                        <div class="flex justify-end pt-4 border-t mt-4">

                            <button type="button" id="cancel-btn"
                                    class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded mr-2">
                                Reset
                            </button>
                            <button type="submit"
                                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Salva
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!--    tabella di riepilogo DataTables-->
        <div class="w-full bg-white p-6 rounded-lg shadow-lg mt-6 md:mt-0">
            <h2 class="text-xl font-semibold text-left max-sm:text-center">Elenco movimenti</h2>

            <table id="table" class="w-full whitespace-nowrap">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Data</th>
                    <th>Categoria</th>
                    <th>Entrate</th>
                    <th>Uscite</th>
                    <th>Note</th>
                    <th>Azioni</th>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</main>

<?php
require_once __DIR__ . "/../views/_all_modals.php";
?>

<!-- Script di Tailwind CSS -->
<script src="https://cdn.tailwindcss.com/3.4.1"></script>

<script src="https://code.jquery.com/jquery-3.7.1.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.js"
        integrity="sha384-w52cgKJL63XVo8/Wwyl+z8ly0lI51gzCtqADl8pHQTXUXkF08iRa7D+sjSmCyHp+"
        crossorigin="anonymous"></script>

<script src="https://cdn.datatables.net/2.3.2/js/dataTables.js"
        integrity="sha384-YDIK5P2Wq/2RyB+U8Zt970p1L/fEftZwbF3e22rV/bPMW+m8z+JjycMAr96s7LAz"
        crossorigin="anonymous"></script>

<script src="https://cdn.datatables.net/buttons/3.2.3/js/dataTables.buttons.js"
        integrity="sha384-+1uAIhLS5hfarW0hfzcsIPg4GcIBaPaOrqoPqgwhCCNTq3nA0ve17LfVzeWq9m+p"
        crossorigin="anonymous"></script>

<script src="https://cdn.datatables.net/buttons/3.2.3/js/buttons.html5.js"
        integrity="sha384-r5RumiuQhALaYWd8i8v0DxCjEXRayyj6nl1wP379+GexLAvE4yuLNoyPEvE6hzDu"
        crossorigin="anonymous"></script>

<script src="https://cdn.datatables.net/responsive/3.0.4/js/dataTables.responsive.js"
        integrity="sha384-zAVoatBLtEAzOhdX4Xkli8AOOsRiPj+iFEsCh/BBYnKNHJCM/G8PNGupst4xx3Ft"
        crossorigin="anonymous"></script>

<script type="module" src="js/app.js"></script>

</body>
</html>