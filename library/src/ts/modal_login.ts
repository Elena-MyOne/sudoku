import { readerButtonLogin } from './libraryCardForm';
import { showInputError, validatePassword } from './modal_register';

const headerLinkLogin = document.querySelector('.register__item-login');
const logInModal = document.querySelector('.login');
const logInCloseButton = document.querySelector('.login__close img');
const logInFormErrors = document.querySelectorAll('.form-login__error') as NodeListOf<HTMLDivElement>;
export const logInForm = document.querySelector('.form-login') as HTMLFormElement;
const emailCardLogInInput = logInForm.emailCard as HTMLInputElement;
const passwordLogInInput = logInForm.password as HTMLInputElement;

export function handleRLodInModal(e: MouseEvent) {
  const target = e.target as HTMLElement;

  if (target === readerButtonLogin || (target === headerLinkLogin && headerLinkLogin.textContent === 'Log In')) {
    logInModal?.classList.add('active');
  }

  if (target === logInCloseButton || target === logInModal) {
    logInModal?.classList.remove('active');
  }
}

export function handleLodInForm(e: Event) {
  e.preventDefault();
  showInputError(emailCardLogInInput, logInFormErrors[0]);
  validatePassword(passwordLogInInput, logInFormErrors[1]);
}
