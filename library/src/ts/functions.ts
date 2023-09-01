import { userData } from '../interfaces/userData';

export function closeModal(modal: HTMLElement) {
  modal.classList.remove('active');
}

export function cleanForm(inputs: HTMLInputElement[]): void {
  inputs.forEach((item) => (item.value = ''));
}

export function getUsersList() {
  return JSON.parse(localStorage.getItem('userNlep') || '[]');
}

export function findLogInUser() {
  const usersList = getUsersList();
  const user = usersList.filter((item: userData) => item.logIn === true);
  if (user.length === 1) {
    return user[0];
  }
  return [];
}

export function generateCardNumber() {
  const usersList = getUsersList();
  const random = parseInt(String(Math.random() * 10e9));
  const cardsNumbers = usersList.length !== 0 ? usersList.filter((item: userData) => item.cardNumber) : [];
  const result = random.toString(16).toUpperCase();

  if (cardsNumbers.includes(random)) {
    generateCardNumber();
  } else {
    return result.length === 9 ? result : result + Math.random() * 10;
  }
}
