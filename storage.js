const MAX_RECORDS = 10;

//Сохраняем результаты в память браузера
function saveRecord(name, score) {
    let records = JSON.parse(localStorage.getItem('gameRecords')) || [];
    
    records.push({ name: name, score: score });
    
    // Сортировка по количеству попыток (от меньшего к большему)
    records.sort((a, b) => a.score - b.score);
    
    // Ограничение до 10 лучших результатов
    records = records.slice(0, MAX_RECORDS);
    
    localStorage.setItem('gameRecords', JSON.stringify(records));
}

//Отображаем таблицу рекордов на странице
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
//очищаем все рекорды
function clearRecords() {
    if (confirm("Точно очистить таблицу рекордов?")) {
        localStorage.removeItem('gameRecords');
        displayRecords();
    }
}