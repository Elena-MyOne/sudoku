import { populateBoardGame } from './buildGame.js';

const levels = document.querySelectorAll('.level');

const LEVEL = {
  EASY: 'level-easy',
  MEDIUM: 'level-medium',
  HARD: 'level-hard',
};

const ceilsNumber = 81;
const easyOpenNumbers = 38;
const mediumOpenNumbers = 30;
const hardOpenNumbers = 24;

let solutionBoard = null;
let gameBoard = null;

function defineGameLevel() {
  for (const level of levels) {
    if (level.classList.contains('active')) {
      if (level.classList.contains(LEVEL.EASY)) {
        return easyOpenNumbers;
      }
      if (level.classList.contains(LEVEL.MEDIUM)) {
        return mediumOpenNumbers;
      }
      if (level.classList.contains(LEVEL.HARD)) {
        return hardOpenNumbers;
      }
    }
  }
}

function isValid(board, row, col, num) {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num || board[i][col] === num) {
      return false;
    }
  }

  //3x3 box
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[startRow + i][startCol + j] === num) {
        return false;
      }
    }
  }

  return true;
}

function solveSudoku(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (solveSudoku(board)) {
              return true;
            }
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function generateSudoku() {
  const board = new Array(9).fill(null).map(() => new Array(9).fill(0));
  solveSudoku(board);
  return board;
}

function generateGameSudoku() {
  const gameLevel = defineGameLevel();
  console.log(gameLevel);

  const board = JSON.parse(JSON.stringify(solutionBoard));

  let cellsToRemove = ceilsNumber - gameLevel;
  while (cellsToRemove > 0) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (board[row][col] !== 0) {
      board[row][col] = 0;
      cellsToRemove--;
    }
  }

  return board;
}

export function initBoardGame() {
  solutionBoard = generateSudoku();
  gameBoard = generateGameSudoku();

  console.log('Solution Board:');
  console.log(solutionBoard);

  // console.log('Game Board:');
  // console.log(gameBoard);

  populateBoardGame(gameBoard);
}

export function setGameLevel(e) {
  const target = e.target;
  levels.forEach((level) => level.classList.remove('active'));

  if (
    target.closest(`.${LEVEL.EASY}`) ||
    target.closest(`.${LEVEL.MEDIUM}`) ||
    target.closest(`.${LEVEL.HARD}`)
  ) {
    target.classList.add('active');
    initBoardGame();
  }
}
