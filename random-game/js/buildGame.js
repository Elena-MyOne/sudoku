import { solutionBoard } from './board.js';
import { openSuccessPopUp } from './popUps.js';

export const digits = document.querySelector('.digits');
const board = document.querySelector('.board');
const eraseButton = document.querySelector('.erase');
const movesCount = document.querySelectorAll('.moves-count');
export const solveButton = document.querySelector('.solve');
export const timeCount = document.querySelector('.time-count');

let moves = 0;
let selectedDigit = 1;
let isGameComplete = false;

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

      if (gameBoard[row][col] === 0) {
        ceil.classList.add('edit');
      }

      board.append(ceil);
    }
  }
}

export function populateDigits() {
  for (let i = 1; i <= 9; i += 1) {
    let digit = document.createElement('div');
    digit.id = i;
    digit.textContent = i;
    digit.classList.add('digit');
    digits.append(digit);

    if (i === 1) {
      digit.classList.add('active');
    }
  }
}

function selectDigit(e) {
  const target = e.target;

  const digitList = document.querySelectorAll('.digit');
  digitList.forEach((item) => item.classList.remove('active'));

  if (target.closest('.digit')) {
    target.classList.add('active');
    selectedDigit = target.id;
  }
}

function fillUpCeil(e) {
  const target = e.target;
  const ceils = document.querySelectorAll('.ceil');

  if (target.classList.contains('edit')) {
    target.textContent = selectedDigit;
    moves += 1;
    showMovesCount();

    ceils.forEach((item) => item.classList.remove('active'));
    target.classList.add('active');
    activateEraseButton();

    checkErrors(target);
    // checkGameComplete(ceils);
  }
}

function checkErrors(target) {
  const ceilPosition = target.id.split('-');
  const row = Number(ceilPosition[0]);
  const col = Number(ceilPosition[1]);

  if (solutionBoard[row][col] != target.textContent) {
    target.classList.add('error');
  } else {
    target.classList.remove('error');
  }
}

// function checkGameComplete() {
//   const ceils = document.querySelectorAll('.ceil');
//   const edits = [...ceils].filter((item) => item.textContent === '');

//   if (edits.length === 0) {
//     const result = edits.filter((item) => !item.classList.contains('error'));
//     return result.length === 0;
//   }

//   return false;
// }

export function showMovesCount() {
  movesCount.forEach((item) => (item.innerHTML = moves));
}

function activateEraseButton() {
  eraseButton.classList.add('active');
}

function easeCeil() {
  const ceils = document.querySelectorAll('.ceil');

  ceils.forEach((item) => {
    if (item.classList.contains('active')) {
      item.textContent = '';
      item.classList.remove('active', 'error');
    }
  });
}

function endTheGame() {
  populateBoardGame(solutionBoard);

  moves = 81;
  showMovesCount();

  isGameComplete = true;
  openSuccessPopUp();

  // console.log(checkGameComplete());
}

digits.addEventListener('click', selectDigit);
board.addEventListener('click', fillUpCeil);
eraseButton.addEventListener('click', easeCeil);
solveButton.addEventListener('click', endTheGame);
