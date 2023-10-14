import { solutionBoard, gameLevel } from './board.js';
import { openSuccessPopUp } from './popUps.js';

export const digits = document.querySelector('.digits');
const board = document.querySelector('.board');
const eraseButton = document.querySelector('.erase');
const movesCount = document.querySelectorAll('.moves-count');
export const solveButton = document.querySelector('.solve');
export const timeCount = document.querySelector('.time-count');

export let moves = 0;
let selectedDigit = 1;

export function populateBoardGame(gameBoard) {
  board.innerHTML = '';

  for (let row = 0; row < 9; row += 1) {
    for (let col = 0; col < 9; col += 1) {
      let ceil = document.createElement('div');
      ceil.id = `${row}-${col}`;
      ceil.classList.add('ceil', 'solved');
      if (col === 2 || col === 5) {
        ceil.classList.add('ceil-border-right');
      }
      if (row === 2 || row == 5) {
        ceil.classList.add('ceil-border-bottom');
      }
      ceil.textContent = gameBoard[row][col] === 0 ? '' : `${gameBoard[row][col]}`;

      if (gameBoard[row][col] === 0) {
        ceil.classList.add('edit');
        ceil.classList.remove('solved');
      }

      if (gameBoard[row][col] === 1) {
        ceil.classList.add('hovered');
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
      hoverCeil(digit);
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
    hoverCeil(target);
  }
}

function hoverCeil(target) {
  const ceils = document.querySelectorAll('.ceil');

  ceils.forEach((item) => {
    if (item.textContent === target.id) {
      item.classList.add('hovered');
    } else {
      item.classList.remove('hovered');
    }
  });
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

    const isGameComplete = checkGameComplete(ceils);

    if (isGameComplete) {
      openSuccessPopUp();
      saveResultToLS();
      return;
    }
  }
}

function checkErrors(target) {
  const ceilPosition = target.id.split('-');
  const row = Number(ceilPosition[0]);
  const col = Number(ceilPosition[1]);

  if (solutionBoard[row][col] != target.textContent) {
    target.classList.add('error');
    target.classList.remove('solved');
  } else {
    target.classList.remove('error');
    target.classList.add('solved');
  }
}

function checkGameComplete(ceils) {
  const result = [...ceils].filter((item) => item.classList.contains('solved'));
  if (result.length === 81) {
    return true;
  }
  return false;
}

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
  openSuccessPopUp();
  saveResultToLS();
}

export function resetMovesCount() {
  moves = 0;
  showMovesCount();
}

export function saveResultToLS() {
  const previousResult = localStorage.getItem('SudokuBRE');
  const data = JSON.parse(previousResult);

  let id = data == null ? 1 : data.length + 1;
  const result = { id, moves, time: timeCount.textContent, level: gameLevel };

  if (data == null) {
    localStorage.setItem('SudokuBRE', JSON.stringify([result]));
  } else {
    data.push(result);
    localStorage.setItem('SudokuBRE', JSON.stringify(data));
  }

  console.log(data);
}

digits.addEventListener('click', selectDigit);
board.addEventListener('click', fillUpCeil);
eraseButton.addEventListener('click', easeCeil);
solveButton.addEventListener('click', endTheGame);
