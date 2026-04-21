// Инициализация при запуске страницы
document.addEventListener('DOMContentLoaded', displayRecords);

// Логика кнопки старта игры
function startGame() {
    const nameInput = document.getElementById('player-name-input');
    
    playerName = nameInput.value.trim();
    if (!playerName) {
        
        alert("Пожалуйста, введите имя!");
        
        return;

    }

    // Скрываем секцию ввода имени 
    document.getElementById('setup-section').classList.add('hidden');
    
    // Показываем игровую секцию 
    document.getElementById('game-section').classList.remove('hidden');
    
    // Выводим приветственное сообщение 
    document.getElementById('welcome-msg').innerText = `Удачи, ${playerName}!`;
    
    resetGameLogic();

}

function resetGame() {
    resetGameLogic();
}