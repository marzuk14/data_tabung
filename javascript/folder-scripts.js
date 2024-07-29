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
        `;
    });
});

