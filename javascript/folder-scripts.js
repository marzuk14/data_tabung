document.addEventListener('DOMContentLoaded', function() {
    updateDateTime();
    loadFolderData();
});

function updateDateTime() {
    const now = new Date();
    const dateTimeDisplay = document.getElementById('dateTimeDisplay');
    dateTimeDisplay.textContent = now.toLocaleString();
}

function loadFolderData() {
    const urlParams = new URLSearchParams(window.location.search);
    const folder = urlParams.get('folder');
    document.getElementById('folderName').textContent = folder;

    const folderData = JSON.parse(localStorage.getItem(folder));
    const folderTable = document.getElementById('folderData');

    folderData.forEach(entry => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${entry.name}</td>
            <td>${entry.quantity}</td>
            <td>${entry.time}</td>
            <td>${entry.date}</td>
        `;

        folderTable.appendChild(row);
    });
}
