import { userData } from '../interfaces/userData';
import { cleanForm, closeModal, findLogInUser, getUsersList } from './functions';
import { showInputError } from './modal_register';

export const buttons = document.querySelector('.favorites__buttons') as HTMLElement;
const cards = document.querySelectorAll('.favorites__cards') as NodeListOf<HTMLDivElement>;
export const buyCardModal = document.querySelector('.buycard') as HTMLDivElement;
const buyCardClose = document.querySelector('.buycard__close img') as HTMLElement;
export const formBuyCard = document.querySelector('.form-buycard') as HTMLFormElement;
export const buyCardNumber = formBuyCard.number as HTMLInputElement;
export const buyCardExp1 = formBuyCard.exp1 as HTMLInputElement;
export const buyCardExp2 = formBuyCard.exp2 as HTMLInputElement;
export const buyCardCVC = formBuyCard.cvc as HTMLInputElement;
export const buyCardCardholder = formBuyCard.cardholder as HTMLInputElement;
export const buyCardPostal = formBuyCard.postal as HTMLInputElement;
export const buyCardCity = formBuyCard.city as HTMLInputElement;
const buycardErrorList = document.querySelectorAll('.form-buycard__error') as NodeListOf<HTMLDivElement>;
export const cardButtons = document.querySelectorAll('.card__button') as NodeListOf<HTMLDivElement>;

let book: string | undefined = '';
let author: string | undefined = '';

export function handleFavoritesButtonsClick(e: MouseEvent) {
  const target = e.target as HTMLElement;
  const inputTarget = e.target as HTMLInputElement;

  if (target.closest('.favorites__input')) {
    cards.forEach((item) => {
      if (item.classList.contains(inputTarget.value)) {
        item.style.display = 'grid';
        item.style.opacity = '1';
      } else {
        item.style.opacity = '0';
        item.style.display = 'none';
      }
    });
  }
}

export function handleBuyCardModel(e: MouseEvent) {
  const target = e.target as HTMLElement;
  const users = getUsersList();
  const loggedInUser = findLogInUser();

  if (target.closest('.card__button')) {
    book = target.dataset.book;
    author = target.dataset.author;
    if (loggedInUser.bankCardInfo === true) {
      const user = users.filter((item: userData) => item.logIn === true).pop();

      const booksList = user.books;
      booksList.push({ book, author });

      const updatedUsers = users.map((item: userData) => (item === user ? { ...item, books: booksList } : item));

      localStorage.setItem('userNlep', JSON.stringify(updatedUsers));

      target.setAttribute('disabled', '');
      target.classList.add('button-own');
      target.textContent = 'Own';
      return;
    }
  }

  if (target.closest('.card__button') && users.length !== 0 && loggedInUser.length !== 0) {
    buyCardModal?.classList.add('active');
  }

  if (target === buyCardClose || target === buyCardModal) {
    buyCardModal?.classList.remove('active');
  }
}

export function validateNumbersInput(input: HTMLInputElement) {
  const number = input.value;
  if (number) {
    input.value = input.value.replace(/[^0-9]/g, '');
  }
}

function validateInputLength(input: HTMLInputElement, length: number, errorDiv: HTMLDivElement) {
  if (input.value.length < length) {
    errorDiv.classList.add('active');
    input.classList.add('error');
  } else {
    errorDiv.classList.remove('active');
    input.classList.remove('error');
  }
}

export function handleFormBuyCard(e: Event) {
  e.preventDefault();

  validateInputLength(buyCardNumber, 16, buycardErrorList[0]);
  validateInputLength(buyCardExp1, 2, buycardErrorList[1]);
  validateInputLength(buyCardExp2, 2, buycardErrorList[1]);
  validateInputLength(buyCardCVC, 3, buycardErrorList[2]);
  showInputError(buyCardCardholder, buycardErrorList[3]);
  showInputError(buyCardPostal, buycardErrorList[4]);
  showInputError(buyCardCity, buycardErrorList[5]);

  const errors = Array.from(buycardErrorList).filter((item) => item.classList.contains('active'));

  if (errors.length !== 0) {
    console.log('Please, fill up Buy a Library card form');
  } else {
    const users = getUsersList();
    const user = users.filter((item: userData) => item.logIn === true).pop();

    const bankCardInfo = true;

    const updatedUsers = users.map((item: userData) => (item === user ? { ...item, bankCardInfo, books: [{ book, author }] } : item));

    localStorage.setItem('userNlep', JSON.stringify(updatedUsers));
    cleanForm([buyCardNumber, buyCardExp1, buyCardExp2, buyCardCVC, buyCardCardholder, buyCardPostal, buyCardCity]);
    closeModal(buyCardModal);
  }
}

export function updateFavoritesButtonsState(buttons: NodeListOf<HTMLDivElement>, user: userData) {
  if (user) {
    const userBooksList = user.books.map((item) => item.book);

    buttons.forEach((button) => {
      if (button.dataset.book) {
        if (userBooksList.includes(button.dataset.book)) {
          button.setAttribute('disabled', '');
          button.classList.add('button-own');
          button.textContent = 'Own';
        }
      }
    });
  }
}
