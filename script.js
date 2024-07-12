// Define createGrid function
function createGrid() {
  var size = parseInt(document.getElementById('size').value);
  var gridContainer = document.getElementById('gridContainer');
  var errorMessage = document.getElementById('errorMessage');

  // Clear previous grid and error message
  gridContainer.innerHTML = '';
  errorMessage.textContent = '';

  // Create the Sudoku grid
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

// Define fillEmptyCells function
let numberOfTries = 0;

function fillEmptyCells() {
  var inputs = document.querySelectorAll('.sudoku-cell input');
  var size = parseInt(document.getElementById('size').value);

  // Initialize grid with size x size array filled with input values
  var grid = [];
  var index = 0;
  for (let i = 0; i < size; i++) {
    var row = [];
    for (let j = 0; j < size; j++) {
      row.push(parseInt(inputs[index].value) || 0); // Use parseInt to ensure numerical values
      index++;
    }
    grid.push(row);
  }

  // Function to check if placing num at grid[row][col] is valid
  function isValid(grid, row, col, num) {
    // Check row
    for (let i = 0; i < grid.length; i++) {
      if (grid[row][i] === num) {
        return false;
      }
    }
    // Check column
    for (let i = 0; i < grid.length; i++) {
      if (grid[i][col] === num) {
        return false;
      }
    }
    // Check 3x3 subgrid
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

  // Backtracking function to solve the Sudoku
  function solveSudoku(grid, size) {
    // Find an empty cell to start solving
    let emptyCell = findEmptyCell(grid);
    if (!emptyCell) {
      return true; // Sudoku solved successfully
    }
  
    let [row, col] = emptyCell;
  
    // Try numbers from 1 to size (assuming size is the length of the grid)
    for (let num = 1; num <= size; num++) {
      if (isValid(grid, row, col, num)) {
        grid[row][col] = num;
  
        if (solveSudoku(grid, size)) {
          return true; // Found a solution recursively
        }
  
        // Backtrack
        grid[row][col] = 0;
      }
    }
  
    return false; // No valid number found for this cell
  }
  
  function isValid(grid, row, col, num) {
    // Check if num is not already in current row, column, or subgrid
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
          return [i, j]; // Return the coordinates of the empty cell
        }
      }
    }
    return null; // Return null if no empty cell is found
  }

  // Convert grid back to input values
  if (solveSudoku(grid, size)) {
    // Update input values in the DOM
    index = 0;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        inputs[index].value = grid[i][j];
        index++;
      }
    }
    showErrorMessage(''); // Clear error message
  } else {
    numberOfTries += 1;
    showErrorMessage(`No solution exists for this Sudoku. Try ${numberOfTries}`); // Show error if no solution
  }
}

function showErrorMessage(message) {
  var errorMessage = document.getElementById('errorMessage');
  errorMessage.textContent = message;
}
