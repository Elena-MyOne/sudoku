const URL = `https://api.unsplash.com/`;
const ACC_KEY = '8NyYKonIfdUqZF55vzooGTZiob6lQ1KlBw0CsDrIfZs';

let search = 'all';

const main = document.querySelector('.main');

async function getImages() {
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

getImages();
