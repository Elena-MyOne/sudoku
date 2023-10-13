import { timeCount } from './buildGame.js';
import { gameLevel, initBoardGame } from './board.js';

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
  }
}

export function openSuccessPopUp() {
  successPopUp.classList.add('active');
  showTimeCountResult();
  showGameLevel();
}

successPopUp.addEventListener('click', closeSuccessPopUp);
