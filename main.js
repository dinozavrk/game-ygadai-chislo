//инициализация при  запуске страницы

document.addEventListener('DOMContentLoaded', displayRecords);

//Логика кнопки старта игры

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

//Кнопка "Начать заного"

function resetGame() {

    resetGameLogic();

}

