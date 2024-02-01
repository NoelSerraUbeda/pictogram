document.addEventListener('DOMContentLoaded', function () {
  const grid = document.getElementById('grid');
  const cells = [];
  const correctCells = new Set();
  let attempts = 100; // Contador de intentos
  let gameEnded = false; // Indicador de si el juego ha terminado

  // Obtener el div con clase "hearts"
  const heartsDiv = document.querySelector('.hearts');

  // Definir coordenadas y nombres de grupos de celdas correctas
  const groups = {
    'Casa': [[9, 8], [8, 8], [7, 8], [6, 8], [5, 8], [4, 8], [9, 2], [8, 2], [7, 2], [6, 2], [5, 2], [4, 2], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [3, 7], [3, 8], [3, 9], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8], [1, 7], [9, 6], [8, 6], [10, 6],[10, 8],[10, 2]],
    'Gato': [[4, 3], [5, 2], [5, 3], [6, 3], [6, 2], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [6, 5], [7, 5], [6, 6], [7, 6], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [6, 8], [5, 8], [4, 8], [4, 9], [4, 10], [5, 10], [6, 10], [7, 10], [8, 10]],
    'Cereza':[[1, 5], [1, 6], [1, 7], [1, 8], [1, 9],[1, 10], [2, 8], [3, 7], [3, 8], [4, 5], [4, 6],[4, 8],[5, 2], [5, 3], [5, 4], [5, 8],[6, 1],[6, 3], [6, 4], [6, 5],[6, 7], [6, 8],[7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6],[7, 8], [7, 9],[7, 10],[8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8], [8, 9],[8, 10], [9, 2], [9, 3], [9, 4],[9, 6], [9, 7], [9, 8], [9, 9],[9, 10],[10, 7], [10, 8], [10, 9]],
    'Nota Musical':[[1, 5], [1, 6], [1, 7], [1, 8], [2, 5], [2, 8], [3, 5], [3, 8], [4, 5], [4, 8], [5, 5], [5, 8], [5, 10], [6, 5] ,[6, 8],[6, 9],[6, 10],[7, 5],[8, 3], [8, 4], [8, 5],[9, 3], [9, 4], [9, 5], [10, 3], [10, 4], [10, 5]]
    // 'free': [[1, 1]],
  };

  // Seleccionar un grupo aleatorio
  const groupNames = Object.keys(groups);
  const randomGroupName = groupNames[Math.floor(Math.random() * groupNames.length)];
  const selectedGroup = groups[randomGroupName];

  // Crear celdas
  for (let i = 0; i < 121; i++) { // Cambiar de 100 a 121
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    // Agregar clase "bloq" a las celdas específicas
    if (i < 11 || i % 11 === 0) { // Cambiar de 10 a 11
      cell.classList.add('bloq');
    }
    cell.addEventListener('click', function () {
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
            const successEvent = new CustomEvent('success', {
              detail: {
                message: '¡Éxito! Es: ' + randomGroupName + ".",
                groupName: randomGroupName
              }
            });
            document.dispatchEvent(successEvent);
          } else {
            updateNumbers();
          }
        } else {
          attempts--;
          document.getElementById('attempts').textContent = attempts;

          heartsDiv.classList.add('shake');
          setTimeout(() => {
            heartsDiv.classList.remove('shake');
          }, 1000);
    
          if (attempts === 0) {
            gameEnded = true;
            const defeatEvent = new CustomEvent('defeat', {
              detail: {
                message: '¡Derrota!'
              }
            });
            document.dispatchEvent(defeatEvent);
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
    const index = y * 11 + x; // Cambiar de 10 a 11
    correctCells.add(index);
  });

  // Actualizar números fuera de las celdas
  function updateNumbers() {
    const rowNumbers = Array.from({ length: 11 }, () => 0); // Cambiar de 10 a 11
    const colNumbers = Array.from({ length: 11 }, () => 0); // Cambiar de 10 a 11

    correctCells.forEach(index => {
      const x = index % 11; // Cambiar de 10 a 11
      const y = Math.floor(index / 11); // Cambiar de 10 a 11
      // Excluir celdas con la clase "bloq"
      if (!cells[index].classList.contains('bloq')) {
        rowNumbers[y]++;
        colNumbers[x]++;
      }
    });

    for (let i = 0; i < 11; i++) { // Cambiar de 10 a 11
      const rowNumber = document.createElement('div');
      rowNumber.classList.add('number');
      rowNumber.textContent = rowNumbers[i];
      cells[i * 11].innerHTML = '';
      cells[i * 11].appendChild(rowNumber);

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
