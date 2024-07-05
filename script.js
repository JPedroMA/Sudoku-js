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

  // Create an array of numbers from 1 to size
  var numbers = Array.from({ length: size }, (_, i) => i + 1);

  // Shuffle the numbers array
  shuffleArray(numbers);

  // Counter for inputs without a value
  var emptyCount = 0;

  // Fill the grid with random numbers
  inputs.forEach(input => {
    if (input.value === '') {
      input.value = numbers[emptyCount % size]; // Use modulo to repeat numbers in range
      emptyCount++;
    }
  });

  // Show error message if all cells are already filled
  var emptyCellsExist = Array.from(inputs).some(input => input.value === '');
  if (!emptyCellsExist) {
    showErrorMessage('All cells are already filled.');
  } else {
    showErrorMessage('');
  }
}

function showErrorMessage(message) {
  var errorMessage = document.getElementById('errorMessage');
  errorMessage.textContent = message;
}

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
