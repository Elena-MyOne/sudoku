import './style.scss';
import { form, submitForm, validateCardInput, validateNameInput } from './ts/form';

form.addEventListener('submit', submitForm);

form.card.addEventListener('input', () => {
  validateCardInput(form.card);
});

form.name.addEventListener('input', () => {
  validateNameInput(form.name);
});
