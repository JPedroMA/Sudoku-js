function createGrid() {
  var size = parseInt(document.getElementById('size').value);
  var gridContainer = document.getElementById('gridContainer');
  var errorMessage = document.getElementById('errorMessage');

  gridContainer.innerHTML = '';
  errorMessage.textContent = '';

  gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    var cell = document.createElement('div');
    cell.classList.add('sudoku-cell');
    var input = document.createElement('input');
    input.type = 'number';
    input.min = '1';
    input.max = `${size}`;
    cell.appendChild(input);
    gridContainer.appendChild(cell);
  }
}

let numberOfTries = 0;

function fillEmptyCells() {
  var inputs = document.querySelectorAll('.sudoku-cell input');
  var size = parseInt(document.getElementById('size').value);

  var grid = [];
  var index = 0;
  for (let i = 0; i < size; i++) {
    var row = [];
    for (let j = 0; j < size; j++) {
      row.push(parseInt(inputs[index].value) || 0); 
      index++;
    }
    grid.push(row);
  }

  function isValid(grid, row, col, num) {

    for (let i = 0; i < grid.length; i++) {
      if (grid[row][i] === num) {
        return false;
      }
    }

    for (let i = 0; i < grid.length; i++) {
      if (grid[i][col] === num) {
        return false;
      }
    }

    let subgridSize = Math.sqrt(grid.length);
    let startRow = Math.floor(row / subgridSize) * subgridSize;
    let startCol = Math.floor(col / subgridSize) * subgridSize;
    for (let i = startRow; i < startRow + subgridSize; i++) {
      for (let j = startCol; j < startCol + subgridSize; j++) {
        if (grid[i][j] === num) {
          return false;
        }
      }
    }
    return true;
  }


  function solveSudoku(grid, size) {
    let emptyCell = findEmptyCell(grid);
    if (!emptyCell) {
      return true; 
    }
  
    let [row, col] = emptyCell;
  
    for (let num = 1; num <= size; num++) {
      if (isValid(grid, row, col, num)) {
        grid[row][col] = num;
  
        if (solveSudoku(grid, size)) {
          return true;
        }
  
        // Backtrack
        grid[row][col] = 0;
      }
    }
  
    return false; 
  }
  
  function isValid(grid, row, col, num) {

    for (let i = 0; i < grid.length; i++) {
      if (grid[row][i] === num || grid[i][col] === num) {
        return false;
      }
    }
  
    let subgridSize = Math.sqrt(grid.length);
    let startRow = Math.floor(row / subgridSize) * subgridSize;
    let startCol = Math.floor(col / subgridSize) * subgridSize;
  
    for (let i = startRow; i < startRow + subgridSize; i++) {
      for (let j = startCol; j < startCol + subgridSize; j++) {
        if (grid[i][j] === num) {
          return false;
        }
      }
    }
  
    return true;
  }
  
  function findEmptyCell(grid) {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid.length; j++) {
        if (grid[i][j] === 0) {
          return [i, j];
        }
      }
    }
    return null;
  }

  if (solveSudoku(grid, size)) {
    index = 0;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        inputs[index].value = grid[i][j];
        index++;
      }
    }
    showErrorMessage(''); 
  } else {
    numberOfTries += 1;
    showErrorMessage(`Esse caso não tem solução. tentativa nº${numberOfTries}`);
  }
}

function showErrorMessage(message) {
  var errorMessage = document.getElementById('errorMessage');
  errorMessage.textContent = message;
}
