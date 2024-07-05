<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Dynamic Sudoku Input Grid</title>
<style>
  body {
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    background-color: #f0f0f0;
  }

  .sudoku-grid {
    border: 2px solid #333;
    padding: 10px;
    background-color: #fff;
    display: grid;
    gap: 1px;
  }

  .sudoku-cell {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ddd;
    border: 1px solid #999;
  }

  .sudoku-cell input {
    width: 80%;
    height: 80%;
    font-size: 1.5rem;
    text-align: center;
    border: none;
    background-color: transparent;
    outline: none;
  }

  .btn-container {
    margin-top: 10px;
  }

  .btn-container button {
    padding: 10px;
    font-size: 1rem;
    cursor: pointer;
  }

  .error-message {
    color: red;
    margin-top: 10px;
  }
</style>
</head>
<body>
  <div>
    <label for="size">Enter grid size (3-9): </label>
    <input type="number" id="size" min="3" max="9" value="3">
    <button onclick="createGrid()">Create Grid</button>
  </div>
  
  <div id="gridContainer" class="sudoku-grid">
    <!-- Grid will be dynamically generated here -->
  </div>

  <div class="btn-container">
    <button onclick="fillEmptyCells()">Fill Empty Cells</button>
  </div>

  <div id="errorMessage" class="error-message"></div>

<script>
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

function fillEmptyCells() {
  var inputs = document.querySelectorAll('.sudoku-cell input');
  var size = parseInt(document.getElementById('size').value);
  var numbers = Array.from({ length: size }, (_, i) => i + 1); // Array of numbers from 1 to size
  
  // Shuffle numbers array for randomness
  numbers.sort(() => Math.random() - 0.5);
  
  // Track if there are empty cells
  var emptyCellsExist = false;
  
  // Fill the grid with random numbers
  for (let i = 0; i < inputs.length; i++) {
    var input = inputs[i];
    if (input.value === '') {
      emptyCellsExist = true;
      if (numbers.length > 0) {
        input.value = numbers.pop();
      } else {
        showErrorMessage('Cannot fill the grid completely.');
        return;
      }
    }
  }
  
  // Show error message if all cells are empty
  if (!emptyCellsExist) {
    showErrorMessage('All cells are already filled.');
  }
}

function showErrorMessage(message) {
  var errorMessage = document.getElementById('errorMessage');
  errorMessage.textContent = message;
}
</script>

</body>
</html>
