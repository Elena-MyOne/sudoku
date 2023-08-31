import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import './style.scss';
import { libraryCardForm, name, card, submitForm, validateCardInput, validateNameInput, enableLibraryCardFormButton, disableLibraryCardFormButton, showLibraryCardInfo, hideLibraryCardInfo } from './ts/libraryCardForm';
import { burger, list, toggleMenu, closeMenu, changeUserIconOnSignUp } from './ts/header';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { buttons, handleFavoritesButtonsClick } from './ts/favorites';
import { profile } from './ts/header';
import { closeRegisterMenu, logOut, registerHeaderLink, renderRegisterMenuOnLogIn, toggleRegisterMenu } from './ts/register';
import { handleRegisterModal, handleSignupForm, signupForm } from './ts/modal_register';
import { findLogInUser, getUsersList } from './ts/functions';
import { handleLodInModal, logInForm, handleLodInForm, favoritesCards, toggleLoginModalCardsButtonOnClick } from './ts/modal_login';

burger?.addEventListener('click', toggleMenu);
list?.addEventListener('click', toggleMenu);
document.body.addEventListener('click', closeMenu);
document.body.addEventListener('click', closeRegisterMenu);
document.body.addEventListener('click', handleRegisterModal);
document.body.addEventListener('click', handleLodInModal);

libraryCardForm.addEventListener('submit', submitForm);

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
profile?.addEventListener('click', toggleRegisterMenu);
signupForm?.addEventListener('submit', handleSignupForm);
registerHeaderLink?.addEventListener('click', logOut);

document.addEventListener('DOMContentLoaded', () => {
  const users = getUsersList();
  const user = findLogInUser();
  changeUserIconOnSignUp(user);
  renderRegisterMenuOnLogIn(user);
  if (users.length !== 0) {
    enableLibraryCardFormButton();
  } else {
    disableLibraryCardFormButton();
  }
  if (user.logIn === true) {
    showLibraryCardInfo();
  } else {
    hideLibraryCardInfo();
  }
});

logInForm?.addEventListener('submit', handleLodInForm);
favoritesCards?.addEventListener('click', toggleLoginModalCardsButtonOnClick);

console.log(`! Digital Library Cards форма примимает номер карты в формате ЗАГЛАВНЫЕ буквы и цифры без пробелов\n\nПоле "Reader's name" принимает имя пользователя в формате "First name(тут пробел)Last Name", вне зависимости от регистра`);

// console.log(``);

// console.log(`Вёрстка соответствует макету. Ширина экрана 768px +26\n\nНи на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12\n\nВНа ширине экрана 768рх реализовано адаптивное меню +12`);
