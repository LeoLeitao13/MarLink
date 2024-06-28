
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username === 'admin' && password === 'admin123') {
        window.location.href = 'crud.html';
    } else {
        alert('Credenciais inválidas!');
    }
});
