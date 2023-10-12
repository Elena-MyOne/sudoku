import { showMovesCount } from './js/moves.js';
import { initBoardGame, setGameLevel } from './js/board.js';
import { populateDigits, digits } from './js/buildGame.js';

const levelsContainer = document.querySelector('.levels');

let selectedNumber = null;
let selectedCeil = null;

function initGame() {
  showMovesCount();
  populateDigits();
  initBoardGame();
}

initGame();

document.addEventListener('load', initBoardGame);
levelsContainer.addEventListener('click', setGameLevel);
