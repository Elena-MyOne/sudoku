import { initBoardGame, setGameLevel, restart } from './js/board.js';
import { populateDigits, digits, showMovesCount, solveButton } from './js/buildGame.js';
import { successPopUp } from './js/popUps.js';
import { gameTime, resetTimer } from './js/timer.js';
import { resultsButton } from './js/results.js';
import { sound } from './js/audio.js';

const levelsContainer = document.querySelector('.levels');

function initGame() {
  showMovesCount();
  populateDigits();
  initBoardGame();
}

initGame();

document.addEventListener('load', initBoardGame);
levelsContainer.addEventListener('click', setGameLevel);
