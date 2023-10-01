const URL = `https://api.unsplash.com/`;
const ACC_KEY = '8NyYKonIfdUqZF55vzooGTZiob6lQ1KlBw0CsDrIfZs';

let search = 'all';

const main = document.querySelector('.main');
const searchInput = document.querySelector('.search-input');
const searchIcon = document.querySelector('.search-icon');

async function getImages(search) {
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
}

getImages(search);

function getSearchImages(e) {
  const value = searchInput.value;
  getImages(value);
}

searchIcon.addEventListener('click', getSearchImages);
searchInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    getSearchImages(e);
  }
});
