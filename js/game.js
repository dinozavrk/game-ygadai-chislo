let secretNumber;
let attempts = 0;
let playerName = "";

// Функция очистки логики для нового раунда
function resetGameLogic() {
    secretNumber = Math.floor(Math.random() * 100) + 1;

    attempts = 0;
    updateUI("", 0);
    // Скрываем кнопку "Начать заново" 
    document.getElementById('reset-btn').classList.add('hidden');
    // Разблокируем поле для ввода числа
    document.getElementById('guess-input').disabled = false;
    // Очищаем поле ввода числа
    document.getElementById('guess-input').value = "";

}

// Функция обработки попытки угадать число
function makeGuess() {
    const input = document.getElementById('guess-input');
    const guess = parseInt(input.value);
    const hintElement = document.getElementById('hint-msg');
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

    // Обновляем отображение счётчика попыток в интерфейсе
    document.getElementById('attempt-count').innerText = attempts;
    input.value = "";
    input.focus();

}

// Функция завершения игры
function endGame() {
    // Блокируем поле ввода 
    document.getElementById('guess-input').disabled = true;
    // Показываем кнопку "Начать заново" 
    document.getElementById('reset-btn').classList.remove('hidden');
    // Сохраняем рекорд 
    saveRecord(playerName, attempts);
    displayRecords();

}

// Функция обновления текста в интерфейсе
function updateUI(hint, att) {

    // Устанавливаем текст подсказки
    document.getElementById('hint-msg').innerText = hint;
    // Устанавливаем значение счётчика попыток
    document.getElementById('attempt-count').innerText = att;

}
