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

export function generateCardNumber() {
  const usersList = getUsersList();
  const random = parseInt(String(Math.random() * 10e8));
  const cardsNumbers = usersList.length !== 0 ? usersList.filter((item: userData) => item.cardNumber) : [];

  if (cardsNumbers.includes(random)) {
    generateCardNumber();
  } else {
    return random.toString(16).toUpperCase();
  }
}
