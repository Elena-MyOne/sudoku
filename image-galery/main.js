import { initPaginationButtons, button1, buttonPrev, buttonNext } from './js/pagination.js';

const URL = `https://api.unsplash.com/`;
const ACC_KEY = '8NyYKonIfdUqZF55vzooGTZiob6lQ1KlBw0CsDrIfZs';

let search = 'all';
let currentPage = 1;
const itemsPerPage = 12;

const cards = document.querySelector('.cards');
const searchInput = document.querySelector('.search-input');
const searchIcon = document.querySelector('.search-icon');
const closeIcon = document.querySelector('.close-icon');
const pagination = document.querySelector('.pagination');

async function getImages(search, page = 1) {
  try {
    const response = await fetch(
      `${URL}search/photos?query=${search}&per_page=${itemsPerPage}&page=${page}&orientation=landscape&client_id=${ACC_KEY}&w=400&h=200`
    );

    const data = await response.json();
    const images = data.results;
    const lastPage = data.total_pages;

    const imagesItems = images
      .map(
        (item) =>
          `
            <div class="images">
            <img class="image" src=${item.urls.small} alt=${item.alt_description} />
            </div>
          `
      )
      .join('');

    cards.innerHTML = imagesItems;

    currentPage = page;

    initPaginationButtons(currentPage, lastPage);
  } catch (error) {
    cards.innerHTML = `<div class="error">Something goes wrong, please try again later</div>`;
  }
}

getImages(search, currentPage);

function getSearchImages(e) {
  const value = searchInput.value;
  getImages(value);
}

function focusInput() {
  searchInput.focus();
}

function toggleCloseIcon() {
  const value = searchInput.value;
  value !== '' ? closeIcon.classList.add('active') : closeIcon.classList.remove('active');
}

function hideCloseIcon() {
  closeIcon.classList.remove('active');
  searchInput.value = '';
  focusInput();
}

window.addEventListener('DOMContentLoaded', focusInput);

searchInput.addEventListener('input', toggleCloseIcon);

closeIcon.addEventListener('click', hideCloseIcon);

searchIcon.addEventListener('click', getSearchImages);
searchInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    getSearchImages(e);
  }
});

pagination.addEventListener('click', (e) => {
  const target = e.target;
  const targetValue = +target.textContent;
  const inputValue = searchInput.value === '' ? 'all' : searchInput.value;

  if (target.closest('.button-2') || target.closest('.button-4')) {
    currentPage = targetValue;
    getImages(inputValue, currentPage);
  }

  if (target.closest('.prev img') && !buttonPrev.classList.contains('disable')) {
    currentPage = +button1.textContent - 1;
    getImages(inputValue, currentPage);
  }

  if (target.closest('.next img') && !buttonNext.classList.contains('disable')) {
    currentPage = +button1.textContent + 1;
    getImages(inputValue, currentPage);
  }
});
