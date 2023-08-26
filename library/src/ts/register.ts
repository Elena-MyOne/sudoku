import { burger, profile } from './burger';

const register = document.querySelector('.register');
const backRegister = document.querySelector('.header__back-register');

export function toggleRegisterMenu(e: MouseEvent) {
  const target = e.target as HTMLElement;
  if (target === profile) {
    register?.classList.toggle('active');
    backRegister?.classList.toggle('active');
  }
}

export function closeRegisterMenu(e: MouseEvent) {
  const target = e.target as HTMLElement;
  if (target === burger || target === backRegister) {
    register?.classList.remove('active');
    backRegister?.classList.remove('active');
  }
}
