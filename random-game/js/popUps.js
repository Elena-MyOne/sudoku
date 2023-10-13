import { timeCount } from './buildGame.js';
import { gameLevel, initBoardGame } from './board.js';

export const close = document.querySelector('.close');
const successPopUp = document.querySelector('.success');
const successTime = document.querySelector('.success-time');
const successLevel = document.querySelector('.success-level');

function showTimeCountResult() {
  const result = timeCount.textContent;
  successTime.textContent = result;
  successLevel.textContent = showGameLevel();
}

function showGameLevel() {
  return gameLevel;
}

function closeSuccessPopUp() {
  successPopUp.classList.remove('active');
  initBoardGame();
}

export function openSuccessPopUp() {
  successPopUp.classList.add('active');
  showTimeCountResult();
}

close.addEventListener('click', closeSuccessPopUp);
