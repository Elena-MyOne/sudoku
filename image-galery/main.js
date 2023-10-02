const URL = `https://api.unsplash.com/`;
const ACC_KEY = '8NyYKonIfdUqZF55vzooGTZiob6lQ1KlBw0CsDrIfZs';

let search = 'all';

const main = document.querySelector('.main');
const searchInput = document.querySelector('.search-input');
const searchIcon = document.querySelector('.search-icon');
const closeIcon = document.querySelector('.close-icon');

async function getImages(search) {
  try {
    const response = await fetch(
      `${URL}search/photos?query=${search}&per_page=12&orientation=landscape&client_id=${ACC_KEY}&w=400&h=200`
    );

    const data = await response.json();
    const images = data.results;

    console.log(images);

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

    main.innerHTML = imagesItems;
  } catch (error) {
    main.innerHTML = `<div class="error">Something goes wrong, please try again later</div>`;
  }
}

getImages(search);

function getSearchImages(e) {
  const value = searchInput.value;
  getImages(value);
}

function focusInput() {
  searchInput.focus();
}

function toggleCoseIcon() {
  const value = searchInput.value;
  value !== '' ? closeIcon.classList.add('active') : closeIcon.classList.remove('active');
}

function hideCoseIcon() {
  closeIcon.classList.remove('active');
  searchInput.value = '';
  focusInput();
}

window.addEventListener('DOMContentLoaded', focusInput);

searchInput.addEventListener('input', toggleCoseIcon);

closeIcon.addEventListener('click', hideCoseIcon);

searchIcon.addEventListener('click', getSearchImages);
searchInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    getSearchImages(e);
  }
});
