document.addEventListener('DOMContentLoaded', function() {
    updateDateTime();
    document.getElementById('addButton').addEventListener('click', addData);
    document.getElementById('saveButton').addEventListener('click', saveData);
    document.getElementById('clearButton').addEventListener('click', clearTable);
});

function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const formattedDate = now.toLocaleDateString('id-ID', options);
    const dateTimeDisplay = document.getElementById('dateTimeDisplay');
    dateTimeDisplay.textContent = `${formattedDate}`;
}

function addData() {
    const name = document.getElementById('name').value;
    const quantity = document.getElementById('quantity').value;
    const now = new Date();
    const time = now.toLocaleTimeString();
    const date = now.toLocaleDateString();
    const dayOfWeek = now.toLocaleDateString('id-ID', { weekday: 'long' });

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
        <td>${dayOfWeek}</td>
        <td><i class="fas fa-trash delete-icon"></i></td>
    `;

    // Add event listener to the delete icon
    newRow.querySelector('.delete-icon').addEventListener('click', function() {
        deliveryData.deleteRow(newRow.rowIndex - 1);
    });

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
	const day = now.toLocaleDateString('id-ID', { weekday: 'long' });
    const dateString = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const timestamp = now.getTime(); // Unique timestamp
    const folderName = `${day} ${dateString}_${timestamp}`;
    const folderData = [];

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        folderData.push({
            name: cells[0].textContent,
            quantity: cells[1].textContent,
            time: cells[2].textContent,
            date: cells[3].textContent,
            day: cells[4].textContent
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


