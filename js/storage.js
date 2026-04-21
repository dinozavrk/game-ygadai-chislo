const MAX_RECORDS = 10;

function saveRecord(name, score) {

    // Загружаем существующие рекорды из localStorage, если их нет - создаём пустой массив
    let records = JSON.parse(localStorage.getItem('gameRecords')) || [];
    
    records.push({ name: name, score: score });
    records.sort((a, b) => a.score - b.score);
    records = records.slice(0, MAX_RECORDS);
    
    // Сохраняем обновлённый массив обратно в localStorage в виде JSON-строки
    localStorage.setItem('gameRecords', JSON.stringify(records));

}

function displayRecords() {

    const records = JSON.parse(localStorage.getItem('gameRecords')) || [];
    const tbody = document.getElementById('records-body');
    tbody.innerHTML = "";
    records.forEach((record, index) => {
        
        // Формируем HTML-строку для новой строки таблицы
        const row = `<tr>
            <td>${index + 1}</td>
            <td>${record.name}</td>
            <td>${record.score}</td>
        </tr>`;
        
        // Добавляем строку в таблицу
        tbody.innerHTML += row;
    });

}

function clearRecords() {

    if (confirm("Точно очистить таблицу рекордов?")) {
        localStorage.removeItem('gameRecords');
        displayRecords();
    }
    
}