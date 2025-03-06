// Обработка формы регистрации
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();  // Отменяем стандартное поведение формы

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Отправка данных на сервер
    const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
        alert('Registration successful! Please login.');
        window.location.href = 'index.html';  // Переход на страницу входа
    } else {
        const error = await response.json();
        alert(`Registration failed: ${error.detail}`);
    }
});