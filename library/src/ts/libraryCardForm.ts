import { userData } from '../interfaces/userData';
import { cleanForm, findSignUpUser } from './functions';

export const libraryCardForm = document.querySelector('.form__form') as HTMLFormElement;
export const name = libraryCardForm.name as unknown as HTMLInputElement;
export const card = libraryCardForm.card as unknown as HTMLInputElement;
export const libraryCardFormButton = document.querySelector('.form__button');
const libraryCardInfo = document.querySelector('.info');
const libraryCardTitle = document.querySelector('.reader__title') as HTMLElement;
const libraryCardText = document.querySelector('.reader__text') as HTMLElement;
const readerButtonSignup = document.querySelector('.reader__button-signup') as HTMLButtonElement;
export const readerButtonLogin = document.querySelector('.reader__button-login') as HTMLButtonElement;
const readerButtonProfile = document.querySelector('.reader__button-profile') as HTMLButtonElement;

const user: userData = findSignUpUser();

export const validateCardInput = (input: HTMLInputElement) => {
  if (input.value) {
    input.value = input.value.replace(/[^0-9A-Z]/g, '');
  }
};

export const validateNameInput = (input: HTMLInputElement) => {
  if (input.value) {
    input.value = input.value.replace(/[^a-zA-Z-\s]/g, '');
  }
};

export const enableLibraryCardFormButton = () => {
  libraryCardFormButton?.removeAttribute('disabled');
};

export const disableLibraryCardFormButton = () => {
  libraryCardFormButton?.setAttribute('disabled', '');
};

const showLibraryCardInfo = () => {
  libraryCardFormButton?.classList.add('hidden');
  libraryCardInfo?.classList.remove('hidden');
  if (libraryCardTitle && libraryCardText) {
    libraryCardTitle.textContent = 'Visit your profile';
    libraryCardText.textContent = 'With a digital library card you get free access to the Library’s wide array of digital resources including e-books, databases, educational resources, and more.';
  }
  readerButtonProfile?.classList.remove('hidden');
  readerButtonSignup?.classList.add('hidden');
  readerButtonLogin?.classList.add('hidden');

  setTimeout(hideLibraryCardInfo, 10000);
};

const hideLibraryCardInfo = () => {
  libraryCardFormButton?.classList.remove('hidden');
  libraryCardInfo?.classList.add('hidden');
  if (libraryCardTitle && libraryCardText) {
    libraryCardTitle.textContent = 'Get a reader card';
    libraryCardText.textContent = 'You will be able to see a reader card after logging into account or you can register a new account';
  }
  readerButtonProfile?.classList.add('hidden');
  readerButtonSignup?.classList.remove('hidden');
  readerButtonLogin?.classList.remove('hidden');
  cleanForm([name, card]);
};

console.log(user);

export const submitForm = (e: SubmitEvent) => {
  e.preventDefault();
  const userName = `${user.name} ${user.lastName}`.toLocaleLowerCase();
  const inputName = name.value.toLocaleLowerCase();
  const userCardNumber = user.cardNumber;
  const inputCardNumber = card.value;

  userName === inputName ? name.classList.remove('form__input-error') : name.classList.add('form__input-error');
  userCardNumber === inputCardNumber ? card.classList.remove('form__input-error') : card.classList.add('form__input-error');

  if (userName === inputName && userCardNumber === inputCardNumber) {
    showLibraryCardInfo();
  }
};
