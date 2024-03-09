
document.addEventListener('DOMContentLoaded', init);

function init() {
    showTransaction();
    updateBalance()
}
function updateBalance() {
    const transactions = getTransaction();
    const balance = document.getElementById('balance');

    const total = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    balance.textContent = `$${total.toFixed(2)}`;
}

function addTransaction() {
    const textInput = document.getElementById('text');
    const amountInput = document.getElementById('amount');

    const text = textInput.value.trim();
    const amount = parseFloat(amountInput.value);

    if (text === '' || isNaN(amount)) {
        alert('Please enter valid values for text and amount.');
        return;
    }

    const newTransactions = JSON.parse(localStorage.getItem('transactions')) || [];

    newTransactions.push({ text, amount });
    localStorage.setItem('transactions', JSON.stringify(newTransactions));

    textInput.value = '';
    amountInput.value = '';

    showTransaction()
    updateBalance()
}

function getTransaction() {
    const transactions = JSON.parse(localStorage.getItem("transactions"));
    return transactions;
}
function showTransaction() {
    const newtransactions = getTransaction();
    const transactionsList = document.getElementById('transactions');

    transactionsList.innerHTML = '';
    newtransactions.forEach(transaction => {
        const listItem = document.createElement('li');

        const formattedAmount = typeof transaction.amount === 'number' ? transaction.amount.toFixed(2) : 'Invalid Amount';

        listItem.textContent = `${transaction.text} : $${formattedAmount}`;
        transactionsList.appendChild(listItem);
    });
}
function clearHistory() {
    localStorage.removeItem('transactions');
    const balance = document.getElementById('balance');
    balance.innerHTML = "$00.00"

    showTransaction();
    updateBalance();
}
