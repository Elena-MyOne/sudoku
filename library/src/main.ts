import './style.scss';
import { form, name, card, submitForm, validateCardInput, validateNameInput } from './ts/form';
import { burger, list, toggleMenu, closeMenu } from './ts/burger';

burger?.addEventListener('click', toggleMenu);
list?.addEventListener('click', toggleMenu);
document.body.addEventListener('click', closeMenu);

form.addEventListener('submit', submitForm);

card.addEventListener('input', () => {
  validateCardInput(card);
});

name.addEventListener('input', () => {
  validateNameInput(name);
});

console.log(`Вёрстка соответствует макету. Ширина экрана 768px +26\n\nНи на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12\n\nВНа ширине экрана 768рх реализовано адаптивное меню +12`)