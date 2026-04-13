let secretNumber;
let attempts = 0;
let playerName = "";

//Очистки логики для нового раунда

function resetGameLogic() {

    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    updateUI("", 0);
    document.getElementById('reset-btn').classList.add('hidden');
    document.getElementById('guess-input').disabled = false;
    document.getElementById('guess-input').value = "";

}


//Обработка попытки угадать

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

    document.getElementById('attempt-count').innerText = attempts;
    input.value = "";
    input.focus();

}


//завершение игры

function endGame() {

    document.getElementById('guess-input').disabled = true;
    document.getElementById('reset-btn').classList.remove('hidden');
    //Вызов функций из storage.js
    saveRecord(playerName, attempts);
    displayRecords();

}


//обновление текста в интерфейсе

function updateUI(hint, att) {

    document.getElementById('hint-msg').innerText = hint;
    document.getElementById('attempt-count').innerText = att;

}

