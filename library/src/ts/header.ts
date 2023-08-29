import { userData } from '../interfaces/userData';

export const burger = document.querySelector('.header__burger');
const nav = document.querySelector('.header__nav');
export const list = document.querySelector('.header__list') as HTMLElement;
export const back = document.querySelector('.header__back') as HTMLElement;
// export const profile = document.querySelector('.header__profile img') as HTMLElement;
export const profile = document.querySelector('.header__profile') as HTMLElement;

export const closeMenu = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (list && back) {
    if (target.closest('.header__link') || target === back || target === profile) {
      nav?.classList.remove('active');
      burger?.classList.remove('active');
      back?.classList.remove('active');
    }
  }
};

export const toggleMenu = () => {
  if (nav && burger && back) {
    nav.classList.toggle('active');
    burger.classList.toggle('active');
    back.classList.toggle('active');
  }
};

export function changeUserIconOnSignUp(user: userData) {
  if (user.name && user.lastName) {
    const letterOne = user.name[0].toUpperCase();
    const letterTwo = user.lastName[0].toUpperCase();
    profile.classList.add('signed-up');
    profile.textContent = letterOne + letterTwo;
    profile.setAttribute('title', `${user.name} ${user.lastName}`);
  }
}

export function setDefaultUerIcon() {
  profile.textContent = '';
  profile.classList.remove('signed-up');
  profile.setAttribute('title', '');
}
