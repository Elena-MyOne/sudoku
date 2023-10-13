import { initBoardGame, setGameLevel } from './js/board.js';
import { populateDigits, digits, showMovesCount, solveButton } from './js/buildGame.js';
import { close } from './js/popUps.js';

const levelsContainer = document.querySelector('.levels');

function initGame() {
  showMovesCount();
  populateDigits();
  initBoardGame();
}

initGame();

document.addEventListener('load', initBoardGame);
levelsContainer.addEventListener('click', setGameLevel);
