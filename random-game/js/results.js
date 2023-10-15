import { gameLevel } from './board.js';

export const resultsButton = document.querySelector('.statistic');
const resultsPopUp = document.querySelector('.results');
const resultsClose = document.querySelector('.results-close img');
const resultsLevelButtons = document.querySelectorAll('.button');
const resultsButtonsContainer = document.querySelector('.results-buttons');
const resultsItems = document.querySelector('.results-items');

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
  populateResultsTable(gameLevel);
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
    populateResultsTable(resultsLevel);
  }
}

function populateResultsTable(level) {
  const results = localStorage.getItem('SudokuBRE');
  const data = JSON.parse(results);

  createResultsItem(data, resultsItems, level);
}

function createResultsItem(items, resultsItems, level) {
  const element = `
  <div class="results-item">
    <div class="results-number">-</div>
    <div class="results-moves">-</div>
    <div class="results-time">-</div>
  </div>
  `;

  if (items == null) {
    resultsItems.innerHTML = element;
    return;
  }

  const result = items.filter((item) => item.level === level).sort((a, b) => a.moves - b.moves);

  if (result.length === 0) {
    resultsItems.innerHTML = element;
  } else {
    resultsItems.innerHTML = result
      .map((elem, index) => {
        return `
      <div id="${elem.id}" class="results-item">
        <div class="results-number">${index + 1}</div>
        <div class="results-moves">${elem.moves}</div>
        <div class="results-time">${elem.time}</div>
    </div>
      `;
      })
      .join('');
  }
}

resultsButton.addEventListener('click', openResultsPopUp);
resultsPopUp.addEventListener('click', closeResultsPopUp);
resultsButtonsContainer.addEventListener('click', setActiveButtonOnClick);
