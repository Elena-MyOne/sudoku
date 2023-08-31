import { userData } from '../interfaces/userData';
import { getUsersList } from './functions';
import { readerButtonLogin } from './libraryCardForm';
import { showInputError, validatePassword } from './modal_register';
import { headerLogIn } from './register';

const logInModal = document.querySelector('.login');
const logInCloseButton = document.querySelector('.login__close img');
const logInFormErrors = document.querySelectorAll('.form-login__error') as NodeListOf<HTMLDivElement>;
export const logInForm = document.querySelector('.form-login') as HTMLFormElement;
const emailCardLogInInput = logInForm.emailCard as HTMLInputElement;
const passwordLogInInput = logInForm.password as HTMLInputElement;
export const favoritesCards = document.querySelector('.favorites__cards') as HTMLDivElement;

export function handleLodInModal(e: MouseEvent) {
  const target = e.target as HTMLElement;

  if (target === readerButtonLogin || (target === headerLogIn && headerLogIn.textContent === 'Log In')) {
    logInModal?.classList.add('active');
  }

  if (target === logInCloseButton || target === logInModal) {
    logInModal?.classList.remove('active');
  }
}

export function toggleLoginModalCardsButtonOnClick(e: MouseEvent) {
  const target = e.target as HTMLElement;
  const users = getUsersList();
  const loggedInUsers = users.filter((item: userData) => item.logIn === true);

  if (target.closest('.card__button') && users.length !== 0 && loggedInUsers.length === 0) {
    logInModal?.classList.add('active');
  }
}

export function handleLodInForm(e: Event) {
  e.preventDefault();
  showInputError(emailCardLogInInput, logInFormErrors[0]);
  validatePassword(passwordLogInInput, logInFormErrors[1]);
}
