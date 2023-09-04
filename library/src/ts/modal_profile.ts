import { userData } from '../interfaces/userData';
import { findLogInUser } from './functions';
import { headerLogIn } from './register';

export const profileModal = document.querySelector('.profile') as HTMLElement;
const buttonProfileLibraryCard = document.querySelector('.reader__button-profile') as HTMLElement;
const profileClose = document.querySelector('.profile__close img') as HTMLElement;
const cardNumberProfile = document.querySelector('.card-number__number') as HTMLElement;
export const cardNumberCopy = document.querySelector('.card-number__icon img') as HTMLElement;
const profileName = document.querySelector('.profile__name') as HTMLElement;
const profileAvatar = document.querySelector('.profile__avatar') as HTMLElement;
const visitsCount = document.querySelectorAll('.visits-count') as NodeListOf<HTMLElement>;
const booksCount = document.querySelectorAll('.books-count') as NodeListOf<HTMLElement>;
const profileBooks = document.querySelector('.profile__books') as HTMLElement;

export function handleProfileModal(e: MouseEvent) {
  const target = e.target as HTMLElement;

  if (target === buttonProfileLibraryCard || (target === headerLogIn && headerLogIn.textContent === 'My profile')) {
    profileModal?.classList.add('active');
    handleProfileUserInfo();
  }

  if (target === profileClose || target === profileModal) {
    profileModal?.classList.remove('active');
  }
}

export function handleProfileUserInfo() {
  const user = findLogInUser();

  if (user.name && user.lastName && user.cardNumber) {
    cardNumberProfile.textContent = user.cardNumber;
    profileName.textContent = `${user.name} ${user.lastName}`;
    profileAvatar.textContent = `${user.name[0]}${user.lastName[0]}`.toUpperCase();
    visitsCount.forEach((item) => (item.textContent = user.visits));
    booksCount.forEach((item) => (item.textContent = user.books.length));

    renderBooksListItems(user);
  }
}

export function copyCardNumber() {
  const user = findLogInUser();
  navigator.clipboard
    .writeText(user.cardNumber)
    .then(() => {
      console.log(user.cardNumber);
      cardNumberProfile.textContent = 'Copied!';
      setTimeout(() => {
        cardNumberProfile.textContent = user.cardNumber;
      }, 1000);
    })
    .catch((err) => {
      console.log('Something went wrong', err);
    });
}

function renderBooksListItems(user: userData) {
  const booksList = user.books;

  const booksItems = booksList.map((book) => {
    return `<li class="profile__book">${book.book}, ${book.author}</li>`;
  });

  profileBooks.innerHTML = booksItems.join('');
}
