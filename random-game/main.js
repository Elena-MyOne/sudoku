import { initBoardGame, setGameLevel } from './js/board.js';
import { populateDigits, digits, showMovesCount } from './js/buildGame.js';

const levelsContainer = document.querySelector('.levels');

function initGame() {
  showMovesCount();
  populateDigits();
  initBoardGame();
}

initGame();

document.addEventListener('load', initBoardGame);
levelsContainer.addEventListener('click', setGameLevel);
