const digits = document.querySelector('.digits');
const board = document.querySelector('.board');

export function populateBoardGame(gameBoard) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      let ceil = document.createElement('div');
      ceil.id = `${row}-${col}`;
      ceil.classList.add('ceil');
      ceil.textContent = gameBoard[row][col] === 0 ? '' : `${gameBoard[row][col]}`;
      board.append(ceil);
    }
  }
}

export function populateDigits() {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const digitsElements = array
    .map((item) => `<div id="${item}" class="digit">${item}</div>`)
    .join('');
  digits.innerHTML = digitsElements;
}
