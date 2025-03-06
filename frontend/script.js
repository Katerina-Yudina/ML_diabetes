let token = null;

token = localStorage.getItem('token');

if (!token) {
    window.location.href = 'index.html';  // Перенаправление на страницу входа
}

// Функция для получения текущих кредитов
async function fetchCredits() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'index.html';  // Перенаправление на страницу входа
        return;
    }

    const response = await fetch('http://localhost:8000/users/me', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (response.ok) {
        const user = await response.json();
        document.getElementById('credits').textContent = user.credits;  // Обновляем кредиты
    } else {
        alert('Failed to fetch user data');
        window.location.href = 'index.html';
    }
}

// Вызов функции при загрузке страницы
window.onload = fetchCredits;

document.getElementById('featuresForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Сбор данных из формы
    const formData = new FormData(e.target);
    const features = {};
    formData.forEach((value, key) => {
        features[key] = parseFloat(value);
    });

    // Отправка данных на сервер
    const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(features),
    });

    if (response.ok) {
        const result = await response.json();
        displayResults(result);
    } else {
        alert('Failed to fetch predictions');
    }
    fetchCredits()
});

function displayResults(results) {
    const tbody = document.querySelector('#result tbody');
    tbody.innerHTML = '';  // Очищаем предыдущие результаты

    for (const [model, prediction] of Object.entries(results)) {
        const row = document.createElement('tr');

        const modelCell = document.createElement('td');
        modelCell.textContent = model;
        row.appendChild(modelCell);

        const predictionCell = document.createElement('td');
        predictionCell.textContent = prediction.toFixed(2);  // Округляем до 2 знаков
        row.appendChild(predictionCell);

        tbody.appendChild(row);
    }
}

document.getElementById('testButton').addEventListener('click', () => {
    const testValues = [50, 1, 23, 101, 192, 125.4, 52, 4, 4.2905, 80];  // Тестовые значения

    // Заполняем форму
    const inputs = document.querySelectorAll('#featuresForm input');
    inputs.forEach((input, index) => {
        input.value = testValues[index];
    });
});