document.addEventListener('DOMContentLoaded', function() {
    const profileButton = document.getElementById('profileButton');
    const dropdownContent = document.getElementById('dropdownContent');
    const profileDropdown = document.getElementById('profileDropdown');

    profileButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior
        dropdownContent.classList.toggle('show');
    });

    // Close dropdown if clicked outside of it
    window.addEventListener('click', function(event) {
        if (!profileDropdown.contains(event.target) && !profileButton.contains(event.target)) {
            dropdownContent.classList.remove('show');
        }
    });
});
