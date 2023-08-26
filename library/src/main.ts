import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import './style.scss';
import { form, name, card, submitForm, validateCardInput, validateNameInput } from './ts/form';
import { burger, list, toggleMenu, closeMenu } from './ts/burger';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { buttons, handleFavoritesButtonsClick } from './ts/favorites';

burger?.addEventListener('click', toggleMenu);
list?.addEventListener('click', toggleMenu);
document.body.addEventListener('click', closeMenu);

form.addEventListener('submit', submitForm);

card.addEventListener('input', () => {
  validateCardInput(card);
});

name.addEventListener('input', () => {
  validateNameInput(name);
});

const swiper = new Swiper('.slider', {
  modules: [Navigation, Pagination],
  spaceBetween: 25,
  pagination: {
    el: '.slider__pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    1430: {
      slidesPerView: 3,
    },
    1429: {
      slidesPerView: 1,
    },
  },
});

buttons?.addEventListener('click', handleFavoritesButtonsClick);

// console.log(`Вёрстка соответствует макету. Ширина экрана 768px +26\n\nНи на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12\n\nВНа ширине экрана 768рх реализовано адаптивное меню +12`);
