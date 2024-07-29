document.addEventListener('DOMContentLoaded', function() {
    displayFolders();
});

function displayFolders() {
    const folderList = document.getElementById('folderList');
    folderList.innerHTML = '';

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const folderItem = document.createElement('div');
        folderItem.className = 'folder-item';

        const folderLink = document.createElement('a');
        folderLink.href = `folder.html?folder=${key}`;
        folderLink.textContent = key;

        const deleteIcon = document.createElement('span');
        deleteIcon.className = 'delete-icon';
        deleteIcon.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteIcon.addEventListener('click', function() {
            deleteFolder(key);
        });

        folderItem.appendChild(folderLink);
        folderItem.appendChild(deleteIcon);
        folderList.appendChild(folderItem);
    }
}

function deleteFolder(key) {
    if (confirm(`Apakah Anda yakin ingin menghapus folder ${key}?`)) {
        localStorage.removeItem(key);
        displayFolders();
        alert(`Folder ${key} telah dihapus.`);
    }
}
