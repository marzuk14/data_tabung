document.addEventListener('DOMContentLoaded', function() {
    updateDateTime();
    document.getElementById('addButton').addEventListener('click', addData);
    document.getElementById('saveButton').addEventListener('click', saveData);
    document.getElementById('clearButton').addEventListener('click', clearTable);
});

function updateDateTime() {
    const now = new Date();
    const dateTimeDisplay = document.getElementById('dateTimeDisplay');
    dateTimeDisplay.textContent = now.toLocaleString();
}

function addData() {
    const name = document.getElementById('name').value;
    const quantity = document.getElementById('quantity').value;
    const now = new Date();
    const time = now.toLocaleTimeString();
    const date = now.toLocaleDateString();

    if (name === '' || quantity === '') {
        alert('Nama dan jumlah tabung harus diisi.');
        return;
    }

    const deliveryData = document.getElementById('deliveryData');
    const newRow = deliveryData.insertRow();

    newRow.innerHTML = `
        <td>${name}</td>
        <td>${quantity}</td>
        <td>${time}</td>
        <td>${date}</td>
    `;

    // Clear the input fields
    document.getElementById('name').value = '';
    document.getElementById('quantity').value = '';
}

function saveData() {
    const deliveryData = document.getElementById('deliveryData');
    const rows = deliveryData.querySelectorAll('tr');
    if (rows.length === 0) {
        alert('Tidak ada data untuk disimpan.');
        return;
    }

    const now = new Date();
    const dateString = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const timestamp = now.getTime(); // Unique timestamp
    const folderName = `${dateString}_${timestamp}`;
    const folderData = [];

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        folderData.push({
            name: cells[0].textContent,
            quantity: cells[1].textContent,
            time: cells[2].textContent,
            date: cells[3].textContent
        });
    });

    localStorage.setItem(folderName, JSON.stringify(folderData));
    alert('Data berhasil disimpan!');

    // Clear the table
    clearTable();
}

function clearTable() {
    const deliveryData = document.getElementById('deliveryData');
    deliveryData.innerHTML = '';
}
