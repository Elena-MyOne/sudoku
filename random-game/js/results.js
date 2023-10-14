import { gameLevel } from './board.js';

export const resultsButton = document.querySelector('.statistic');
const resultsPopUp = document.querySelector('.results');
const resultsClose = document.querySelector('.results-close img');
const resultsLevelButtons = document.querySelectorAll('.button');
const resultsButtonsContainer = document.querySelector('.results-buttons');

let resultsLevel = gameLevel;

function addActiveClass(item) {
  item.classList.add('active');
}

function removeActiveClass(item) {
  item.classList.remove('active');
}

function openResultsPopUp() {
  addActiveClass(resultsPopUp);
  setDefaultActiveButton();
}

function closeResultsPopUp(e) {
  const target = e.target;
  if (target === resultsClose || target === resultsPopUp) {
    removeActiveClass(resultsPopUp);
  }
}

function setDefaultActiveButton() {
  resultsLevelButtons.forEach((item) => {
    item.textContent === gameLevel ? addActiveClass(item) : removeActiveClass(item);
  });
}

function setActiveButtonOnClick(e) {
  const target = e.target;
  resultsLevelButtons.forEach((item) => removeActiveClass(item));

  if (
    target.closest('.results-easy') ||
    target.closest('.results-medium') ||
    target.closest('.results-hard')
  ) {
    addActiveClass(target);
    resultsLevel = target.textContent;
  }
}

resultsButton.addEventListener('click', openResultsPopUp);
resultsPopUp.addEventListener('click', closeResultsPopUp);
resultsButtonsContainer.addEventListener('click', setActiveButtonOnClick);
