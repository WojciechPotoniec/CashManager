import { showToast, formatCurrency, updateBalances } from "./modules/uiHelpers.js";
import { loadCategories } from './modules/categoryService.js';

import { initDataTable } from './modules/dataTable.js';

import { initSubTotalModal } from './modal/subTotalModal.js';

import { initCategoryHandler } from './modules/categoryHandler.js';
import { initCategoryModal } from './modal/categoryModal.js';
import { initToggleCategoryStatusModal } from './modal/toggleCategoryStatusModal.js';
import { initDeleteCategoryModal } from './modal/deleteCategoryModal.js';

import { initMovementForm } from './modules/movementForm.js';
import { initEditMovementModal } from './modal/editMovementModal.js';

$(document).ready(function() {

    window.app = {
        showToast,
        formatCurrency,
        updateBalances,
        loadCategories
    };

    const table = initDataTable();

    initSubTotalModal();

    initCategoryHandler();
    initCategoryModal();
    initToggleCategoryStatusModal();
    initDeleteCategoryModal();

    initMovementForm(table);
    initEditMovementModal(table);
});