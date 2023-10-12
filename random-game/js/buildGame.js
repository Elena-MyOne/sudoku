export const digits = document.querySelector('.digits');
const digitsList = document.querySelectorAll('.digit');
const board = document.querySelector('.board');

export function populateBoardGame(gameBoard) {
  board.innerHTML = '';

  for (let row = 0; row < 9; row += 1) {
    for (let col = 0; col < 9; col += 1) {
      let ceil = document.createElement('div');
      ceil.id = `${row}-${col}`;
      ceil.classList.add('ceil');
      if (col === 2 || col === 5) {
        ceil.classList.add('ceil-border-right');
      }
      if (row === 2 || row == 5) {
        ceil.classList.add('ceil-border-bottom');
      }
      ceil.textContent = gameBoard[row][col] === 0 ? '' : `${gameBoard[row][col]}`;
      board.append(ceil);
    }
  }
}

export function populateDigits() {
  for (let i = 0; i <= 9; i += 1) {
    let digit = document.createElement('div');
    digit.id = i;
    digit.textContent = i;
    digit.classList.add('digit');
    digits.append(digit);
  }
}

function selectDigit(e) {
  const target = e.target;

  const digitList = document.querySelectorAll('.digit');
  digitList.forEach((item) => item.classList.remove('active'));

  if (target.closest('.digit')) {
    target.classList.add('active');
  }
}

digits.addEventListener('click', selectDigit);
