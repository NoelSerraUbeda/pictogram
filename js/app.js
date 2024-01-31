document.addEventListener('DOMContentLoaded', function() {
    const grid = document.getElementById('grid');
    const cells = [];
    const correctCells = new Set();
    let attempts = 5; // Contador de intentos
    let gameEnded = false; // Indicador de si el juego ha terminado

    // Definir coordenadas y nombres de grupos de celdas correctas
    const groups = {
        'casa': [[9, 8], [8, 8], [7, 8], [6, 8], [5, 8], [4, 8], [9, 2], [8, 2], [7, 2], [6, 2], [5, 2], [4, 2], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [3, 7], [3, 8], [3, 9], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8], [1, 7], [9, 6], [8, 6]],
        'pajaro': [[1, 1], [1, 2], [1, 3], [1, 4], [1, 5]],
        // Agrega más grupos según tus necesidades
    };

    // Seleccionar un grupo aleatorio
    const groupNames = Object.keys(groups);
    const randomGroupName = groupNames[Math.floor(Math.random() * groupNames.length)];
    const selectedGroup = groups[randomGroupName];

    // Crear celdas
    for (let i = 0; i < 100; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        // Agregar clase "bloq" a las celdas específicas
        if (i < 11 || i % 10 === 0) {
            cell.classList.add('bloq');
        }
        cell.addEventListener('click', function() {
            if (gameEnded) return; // No hacer nada si el juego ha terminado
            const index = parseInt(cell.dataset.index);
            // Verificar si la celda no tiene la clase "bloq"
            if (!cell.classList.contains('bloq') && !cell.classList.contains('correct')) {
                if (correctCells.has(index)) {
                    cell.classList.add('correct');
                    correctCells.delete(index);
                    if (correctCells.size === 0) {
                        updateNumbers();
                        gameEnded = true;
                        alert('¡Éxito! Forma: ' + randomGroupName); // Mostrar el nombre del grupo
                    } else {
                        updateNumbers();
                    }
                } else {
                    attempts--;
                    document.getElementById('attempts').textContent = attempts; 
                    if (attempts === 0) {
                        gameEnded = true;
                        alert('¡Derrota!');
                    } 
                }
            }
        });
        grid.appendChild(cell);
        cells.push(cell);
    }

    // Convertir coordenadas a índices y agregar a correctCells
    selectedGroup.forEach(coords => {
        const [x, y] = coords;
        const index = y * 10 + x;
        correctCells.add(index);
    });

    // Actualizar números fuera de las celdas
    function updateNumbers() {
        const rowNumbers = Array.from({ length: 10 }, () => 0);
        const colNumbers = Array.from({ length: 10 }, () => 0);
    
        correctCells.forEach(index => {
            const x = index % 10;
            const y = Math.floor(index / 10);
            // Excluir celdas con la clase "bloq"
            if (!cells[index].classList.contains('bloq')) {
                rowNumbers[y]++;
                colNumbers[x]++;
            }
        });
    
        for (let i = 0; i < 10; i++) {
            const rowNumber = document.createElement('div');
            rowNumber.classList.add('number');
            rowNumber.textContent = rowNumbers[i];
            cells[i * 10].innerHTML = '';
            cells[i * 10].appendChild(rowNumber);
    
            const colNumber = document.createElement('div');
            colNumber.classList.add('number');
            colNumber.textContent = colNumbers[i];
            cells[i].innerHTML = '';
            cells[i].appendChild(colNumber);
        }
    }
    

    // Inicializar los números
    updateNumbers();
});
