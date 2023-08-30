import { readerButtonLogin } from './libraryCardForm';

const headerLinkLogin = document.querySelector('.register__item-login');
const logInModal = document.querySelector('.login');
const logInCloseButton = document.querySelector('.login__close img');

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
}
