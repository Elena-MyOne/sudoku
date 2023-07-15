import './style.scss';
import { form, name, card, submitForm, validateCardInput, validateNameInput } from './ts/form';

form.addEventListener('submit', submitForm);

card.addEventListener('input', () => {
  validateCardInput(card);
});

name.addEventListener('input', () => {
  validateNameInput(name);
});
