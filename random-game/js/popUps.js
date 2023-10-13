import { timeCount, resetMovesCount } from './buildGame.js';
import { gameLevel, initBoardGame } from './board.js';
import { resetTimer } from './timer.js';

const close = document.querySelector('.close img');
export const successPopUp = document.querySelector('.success');
const successTime = document.querySelector('.success-time');
const successLevel = document.querySelector('.success-level');

function showTimeCountResult() {
  const result = timeCount.textContent;
  successTime.textContent = result;
}

function showGameLevel() {
  successLevel.textContent = gameLevel;
}

function closeSuccessPopUp(e) {
  const target = e.target;
  if (target === close || target === successPopUp) {
    successPopUp.classList.remove('active');
    initBoardGame();
    resetMovesCount();
    resetTimer();
  }
}

export function openSuccessPopUp() {
  successPopUp.classList.add('active');
  showTimeCountResult();
  showGameLevel();
}

successPopUp.addEventListener('click', closeSuccessPopUp);
