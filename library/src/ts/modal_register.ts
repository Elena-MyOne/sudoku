import { registerHeaderLink, renderRegisterMenuOnLogIn } from './register';
import { closeModal, cleanForm, getUsersList, generateCardNumber } from './functions';
import { userData } from '../interfaces/userData';
import { changeUserIconOnSignUp } from './header';
import { enableLibraryCardFormButton, showLibraryCardInfo } from './libraryCardForm';

const registerLibraryCardLink = document.querySelector('.reader__button') as HTMLElement;
const signupClose = document.querySelector('.signup__close img') as HTMLElement;
export const signupBack = document.querySelector('.signup') as HTMLElement;
export const signupForm = document.getElementById('signup') as HTMLFormElement;
const signupFormErrors = document.querySelectorAll('.form-signup__error') as NodeListOf<HTMLDivElement>;

const usersList = getUsersList();

export function handleRegisterModal(e: MouseEvent) {
  const target = e.target as HTMLElement;

  if (target === registerLibraryCardLink || (target === registerHeaderLink && registerHeaderLink.textContent === 'Register')) {
    signupBack?.classList.add('active');
  }

  if (target === signupClose || target === signupBack) {
    signupBack?.classList.remove('active');
  }
}

export function showInputError(input: HTMLInputElement, errorDiv: HTMLDivElement): void {
  if (input.value === '') {
    errorDiv?.classList.add('active');
    input.classList.add('error');
  } else {
    errorDiv?.classList.remove('active');
    input.classList.remove('error');
  }
}

function validateEmail(input: HTMLInputElement, errorDiv: HTMLDivElement): void {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (input.value.match(emailRegex)) {
    errorDiv?.classList.remove('active');
    input.classList.remove('error');
  } else {
    errorDiv?.classList.add('active');
    input.classList.add('error');
  }
}

export function validatePassword(input: HTMLInputElement, errorDiv: HTMLDivElement): void {
  if (input.value.length < 8) {
    errorDiv?.classList.add('active');
    input.classList.add('error');
  } else {
    errorDiv?.classList.remove('active');
    input.classList.remove('error');
  }
}

export function handleSignupForm(e: Event) {
  e.preventDefault();
  const { name, lastName, email, password } = signupForm.elements as unknown as {
    [key: string]: HTMLInputElement;
  };

  showInputError(name, signupFormErrors[0]);
  showInputError(lastName, signupFormErrors[1]);
  validateEmail(email, signupFormErrors[2]);
  validatePassword(password, signupFormErrors[3]);

  const errors = Array.from(signupFormErrors).filter((item) => item.classList.contains('active'));

  if (errors.length !== 0) {
    console.log('errors!');
    return;
  } else {
    const user = {
      cardNumber: generateCardNumber(),
      name: name.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      logIn: true,
    };

    usersList.forEach((item: userData) => {
      item.logIn = false;
    });
    usersList.push(user);

    localStorage.setItem('userNlep', JSON.stringify(usersList));
    cleanForm([name, lastName, email, password]);
    closeModal(signupBack);
    changeUserIconOnSignUp(user);
    renderRegisterMenuOnLogIn(user);
    enableLibraryCardFormButton();
    showLibraryCardInfo();
  }
}
