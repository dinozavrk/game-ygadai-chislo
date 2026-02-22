let secretNumber;
let attempts = 0;
let playerName = "";
const MAX_RECORDS = 10;

// Инициализация таблицы при загрузке
document.addEventListener('DOMContentLoaded', displayRecords);

function startGame() {
    const nameInput = document.getElementById('player-name-input');
    playerName = nameInput.value.trim();

    if (!playerName) {
        alert("Пожалуйста, введите имя!");
        return;
    }

    document.getElementById('setup-section').classList.add('hidden');
    document.getElementById('game-section').classList.remove('hidden');
    document.getElementById('welcome-msg').innerText = `Удачи, ${playerName}!`;
    
    resetGameLogic();
}

function resetGameLogic() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    updateUI("", 0);
    document.getElementById('reset-btn').classList.add('hidden');
    document.getElementById('guess-input').disabled = false;
    document.getElementById('guess-input').value = "";
}

function makeGuess() {
    const input = document.getElementById('guess-input');
    const guess = parseInt(input.value);
    const hintElement = document.getElementById('hint-msg');

    // Валидация ввода
    if (isNaN(guess) || guess < 1 || guess > 100) {
        hintElement.innerText = "Введите число от 1 до 100!";
        return;
    }

    attempts++;
    
    if (guess === secretNumber) {
        hintElement.innerText = `🎉 Вы угадали! Число было ${secretNumber}.`;
        endGame();
    } else if (guess < secretNumber) {
        hintElement.innerText = "Загаданное число БОЛЬШЕ";
    } else {
        hintElement.innerText = "Загаданное число МЕНЬШЕ";
    }

    document.getElementById('attempt-count').innerText = attempts;
    input.value = "";
    input.focus();
}

function endGame() {
    document.getElementById('guess-input').disabled = true;
    document.getElementById('reset-btn').classList.remove('hidden');
    saveRecord(playerName, attempts);
    displayRecords();
}

function saveRecord(name, score) {
    let records = JSON.parse(localStorage.getItem('gameRecords')) || [];
    
    records.push({ name: name, score: score });
    
    // Сортировка по количеству попыток (от меньшего к большему)
    records.sort((a, b) => a.score - b.score);
    
    // Ограничение до 10 лучших результатов
    records = records.slice(0, MAX_RECORDS);
    
    localStorage.setItem('gameRecords', JSON.stringify(records));
}

function displayRecords() {
    const records = JSON.parse(localStorage.getItem('gameRecords')) || [];
    const tbody = document.getElementById('records-body');
    tbody.innerHTML = "";

    records.forEach((record, index) => {
        const row = `<tr>
            <td>${index + 1}</td>
            <td>${record.name}</td>
            <td>${record.score}</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

function clearRecords() {
    if (confirm("Точно очистить таблицу рекордов?")) {
        localStorage.removeItem('gameRecords');
        displayRecords();
    }
}

function resetGame() {
    resetGameLogic();
}

function updateUI(hint, att) {
    document.getElementById('hint-msg').innerText = hint;
    document.getElementById('attempt-count').innerText = att;
}