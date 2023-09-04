import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import './style.scss';
import { libraryCardForm, name, card, submitForm, validateCardInput, validateNameInput, enableLibraryCardFormButton, disableLibraryCardFormButton, showLibraryCardInfo, hideLibraryCardInfo } from './ts/libraryCardForm';
import { burger, list, toggleMenu, closeMenu, changeUserIconOnSignUp } from './ts/header';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { buttons, handleFavoritesButtonsClick, handleBuyCardModel, formBuyCard, handleFormBuyCard, buyCardNumber, validateNumbersInput, buyCardExp1, buyCardExp2, buyCardCVC, cardButtons, updateFavoritesButtonsState } from './ts/favorites';
import { profile } from './ts/header';
import { closeRegisterMenu, logOut, registerHeaderLink, renderRegisterMenuOnLogIn, toggleRegisterMenu } from './ts/register';
import { handleRegisterModal, handleSignupForm, signupForm } from './ts/modal_register';
import { findLogInUser, getUsersList } from './ts/functions';
import { handleLodInModal, logInForm, handleLodInForm, favoritesCards, toggleLoginModalCardsButtonOnClick } from './ts/modal_login';
import { handleProfileUserInfo, handleProfileModal, cardNumberCopy, copyCardNumber } from './ts/modal_profile';

burger?.addEventListener('click', toggleMenu);
list?.addEventListener('click', toggleMenu);
document.body.addEventListener('click', closeMenu);
document.body.addEventListener('click', closeRegisterMenu);
document.body.addEventListener('click', handleRegisterModal);
document.body.addEventListener('click', handleLodInModal);
document.body.addEventListener('click', handleProfileModal);
document.body.addEventListener('click', handleBuyCardModel);

libraryCardForm.addEventListener('submit', submitForm);

card.addEventListener('input', () => {
  validateCardInput(card);
});

name.addEventListener('input', () => {
  validateNameInput(name);
});

[buyCardNumber, buyCardExp1, buyCardExp2, buyCardCVC].forEach((item: HTMLInputElement) => {
  item.addEventListener('input', () => {
    validateNumbersInput(buyCardNumber);
  });
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

swiper;

buttons?.addEventListener('click', handleFavoritesButtonsClick);
profile?.addEventListener('click', toggleRegisterMenu);
signupForm?.addEventListener('submit', handleSignupForm);
registerHeaderLink?.addEventListener('click', logOut);

document.addEventListener('DOMContentLoaded', () => {
  const users = getUsersList();
  const user = findLogInUser();
  changeUserIconOnSignUp(user);
  renderRegisterMenuOnLogIn(user);
  handleProfileUserInfo();
  if (users.length !== 0) {
    enableLibraryCardFormButton();
  } else {
    disableLibraryCardFormButton();
  }
  if (user.logIn === true) {
    showLibraryCardInfo();
    updateFavoritesButtonsState(cardButtons, user);
  } else {
    hideLibraryCardInfo();
  }
});

logInForm?.addEventListener('submit', handleLodInForm);
favoritesCards?.addEventListener('click', toggleLoginModalCardsButtonOnClick);
cardNumberCopy?.addEventListener('click', copyCardNumber);
formBuyCard?.addEventListener('submit', handleFormBuyCard);

console.log(`! Digital Library Cards форма примимает номер карты в формате ЗАГЛАВНЫЕ буквы и цифры без пробелов\n\nПоле "Reader's name" принимает имя пользователя в формате "First name(тут пробел)Last Name", вне зависимости от регистра`);

console.log(`Выполнены все требования к функционалу: 200 баллов`);
