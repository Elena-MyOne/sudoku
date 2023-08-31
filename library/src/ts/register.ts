import { userData } from '../interfaces/userData';
import { findLogInUser, getUsersList } from './functions';
import { burger, profile, setDefaultUerIcon } from './header';
import { disableLibraryCardFormButton, hideLibraryCardInfo } from './libraryCardForm';

const register = document.querySelector('.register');
const backRegister = document.querySelector('.header__back-register');
export const registerHeaderLink = document.querySelector('.register__item-register') as HTMLElement;
const title = document.querySelector('.register__title');
export const headerLogIn = document.querySelector('.register__item-login');

const user = findLogInUser();

export function toggleRegisterMenu(e: MouseEvent) {
  const target = e.target as HTMLElement;
  if (target === profile) {
    register?.classList.toggle('active');
    backRegister?.classList.toggle('active');
  }
}

export function closeRegisterMenu(e: MouseEvent) {
  const target = e.target as HTMLElement;
  if (target === burger || target === backRegister || target === registerHeaderLink || target === headerLogIn) {
    register?.classList.remove('active');
    backRegister?.classList.remove('active');
  }
}

export function renderRegisterMenuOnLogIn(user: userData) {
  if (title && headerLogIn && registerHeaderLink) {
    if (user.cardNumber) {
      title.textContent = user.cardNumber;
      title.classList.add('signed-up');
      headerLogIn.textContent = 'My profile';
      registerHeaderLink.textContent = 'Log Out';
    } else {
      title.textContent = 'Profile';
      title.classList.remove('signed-up');
      headerLogIn.textContent = 'Log In';
      registerHeaderLink.textContent = 'Register';
    }
  }
}

export function logOut() {
  console.log(registerHeaderLink.textContent);
  if (registerHeaderLink.textContent === 'Log Out') {
    const usersList = getUsersList();
    if (usersList.length !== 0) {
      const newUsersList = usersList.map((item: userData) => ({
        ...item,
        logIn: false,
      }));
      localStorage.setItem('userNlep', JSON.stringify(newUsersList));
      setTimeout(() => renderRegisterMenuOnLogIn(user), 500);
      setDefaultUerIcon();
      disableLibraryCardFormButton();
      hideLibraryCardInfo();
    }
  }
}
