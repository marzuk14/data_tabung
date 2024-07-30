document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginButton').addEventListener('click', function() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('error-message');

        // Hardcoded credentials for simplicity
        const validUsername = 'admin';
        const validPassword = '';

        if (username === validUsername && password === validPassword) {
            // Redirect to another page on successful login
            window.location.href = 'index.html'; // Ganti dengan halaman yang sesuai
        } else {
            errorMessage.textContent = 'Username atau password salah.';
        }
    });
});
