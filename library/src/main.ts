import './style.scss';
import { form, name, card, submitForm, validateCardInput, validateNameInput } from './ts/form';

form.addEventListener('submit', submitForm);

card.addEventListener('input', () => {
  validateCardInput(card);
});

name.addEventListener('input', () => {
  validateNameInput(name);
});

console.log(`Вёрстка валидная +10\nВёрстка семантическая +16\nВёрстка соответствует макету +54\nОбщие требования к верстке +20\n\nПоля input в форме принимают только буквы и "-" (Reader's name) или только цифры и "-" (Card number)`)