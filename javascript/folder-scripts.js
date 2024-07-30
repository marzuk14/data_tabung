document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const folderName = urlParams.get('folder');
    
    if (!folderName) {
        alert('Nama folder tidak ditemukan.');
        window.location.href = 'data.html';
        return;
    }
    
    document.getElementById('folderName').textContent = folderName;
    
    const folderData = JSON.parse(localStorage.getItem(folderName)) || [];
    const folderDataTable = document.getElementById('folderData');

    folderData.forEach(item => {
        const row = folderDataTable.insertRow();
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.time}</td>
            <td>${item.date}</td>
            <td>${item.day}</td>
            <td><i class="fas fa-trash delete-icon"></i></td>
        `;
        
        // Add delete functionality to the delete icon
        const deleteIcon = row.querySelector('.delete-icon');
        deleteIcon.addEventListener('click', function() {
            row.remove();
            updateLocalStorage(folderName);
        });
    });

    // Add event listener for add data button
    document.getElementById('addDataButton').addEventListener('click', function() {
        document.getElementById('addDataForm').style.display = 'block';
    });

    // Add event listener for submit button
    document.getElementById('submitDataButton').addEventListener('click', function() {
        const name = document.getElementById('nameInput').value;
        const quantity = document.getElementById('quantityInput').value;
        const now = new Date();
        const time = now.toLocaleTimeString();
        const date = now.toLocaleDateString();
        const dayOfWeek = now.toLocaleDateString('id-ID', { weekday: 'long' });

        if (name === '' || quantity === '') {
            alert('Nama dan jumlah tabung harus diisi.');
            return;
        }

        const row = folderDataTable.insertRow();
        row.innerHTML = `
            <td>${name}</td>
            <td>${quantity}</td>
            <td>${time}</td>
            <td>${date}</td>
            <td>${dayOfWeek}</td>
            <td><i class="fas fa-trash delete-icon"></i></td>
        `;

        // Add delete functionality to the delete icon
        const deleteIcon = row.querySelector('.delete-icon');
        deleteIcon.addEventListener('click', function() {
            row.remove();
            updateLocalStorage(folderName);
        });

        // Clear input fields and hide form
        document.getElementById('nameInput').value = '';
        document.getElementById('quantityInput').value = '';
        document.getElementById('addDataForm').style.display = 'none';

        // Save data to localStorage
        updateLocalStorage(folderName);
    });

    // Add event listener for cancel button
    document.getElementById('cancelButton').addEventListener('click', function() {
        document.getElementById('addDataForm').style.display = 'none';
    });
});

function updateLocalStorage(folderName) {
    const folderDataTable = document.getElementById('folderData');
    const rows = folderDataTable.querySelectorAll('tr');
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
}
