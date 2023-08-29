import { burger, profile } from './header';

const register = document.querySelector('.register');
const backRegister = document.querySelector('.header__back-register');
export const registerHeaderLink = document.querySelector('.register__item-register') as HTMLElement;
const LoginHeaderLink = document.querySelector('.register__item-login');

export function toggleRegisterMenu(e: MouseEvent) {
  const target = e.target as HTMLElement;
  if (target === profile) {
    register?.classList.toggle('active');
    backRegister?.classList.toggle('active');
  }
}

export function closeRegisterMenu(e: MouseEvent) {
  const target = e.target as HTMLElement;
  if (target === burger || target === backRegister || target === registerHeaderLink || target === LoginHeaderLink) {
    register?.classList.remove('active');
    backRegister?.classList.remove('active');
  }
}
