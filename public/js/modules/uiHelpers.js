export function showToast(message, type = 'success', duration = 3000) {
    const isSuccess = type === 'success';

    const toastElement = isSuccess ? $('#success-toast') : $('#error-toast');
    const messageElement = isSuccess ? $('#success-toast-message') : $('#error-toast-message');

    messageElement.text(message);

    toastElement.removeClass('hidden').fadeIn(400);

    setTimeout(function() {
        toastElement.fadeOut(400, function() {
            $(this).addClass('hidden');
        });
    }, duration);
};


export function formatCurrency(value) {
    if (isNaN(value)) { value = 0; }
    return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(value);
}

export function updateBalances(balances) {
    const totalBalanceEl = $('#totalBalance');
    const subTotalBalanceEl = $('#subTotalBalance');

    const totalValue = balances.total || 0;
    const subtotalValue = balances.subtotal || 0;

    totalBalanceEl.text(formatCurrency(totalValue));
    totalBalanceEl.removeClass('text-red-600 text-green-600').addClass(totalValue < 0 ? 'text-red-600' : 'text-green-600');

    subTotalBalanceEl.text(formatCurrency(subtotalValue));
};