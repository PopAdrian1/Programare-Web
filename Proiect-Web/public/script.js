
function createGrid(gridId, labelsId) {
  const grid = document.getElementById(gridId);
  const labels = document.getElementById(labelsId);
  
  // Curățăm conținutul existent
  grid.innerHTML = '';
  labels.innerHTML = '';

  // Generăm etichetele pentru rânduri (1-10)
  for (let i = 1; i <= 10; i++) {
    const rowLabel = document.createElement('span');
    rowLabel.classList.add('row-label');
    rowLabel.textContent = i;
    labels.appendChild(rowLabel);
  }

  // Generăm cele 100 de celule pentru grila 10x10
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    
    // Adăugăm o clasă specifică pentru grila inamicului pentru efectul de crosshair (din CSS)
    if (gridId === 'enemy-grid') {
      cell.classList.add('enemy-cell');
    }
    
    cell.dataset.index = i;
    grid.appendChild(cell);
  }
}

// Apelăm funcția pentru ambele flote, trimițând și ID-ul containerului de etichete
createGrid('player-grid', 'player-row-labels');
createGrid('enemy-grid', 'enemy-row-labels');