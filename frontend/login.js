// Обработка формы входа
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();  // Отменяем стандартное поведение формы

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Отправка данных на сервер
    const response = await fetch('http://localhost:8000/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${username}&password=${password}`,
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.access_token);  // Сохраняем токен
        window.location.href = 'predict.html';  // Переход на страницу predict.html
    } else {
        alert('Login failed');
    }
});