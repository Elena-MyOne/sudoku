import { findLogInUser } from './functions';
import { headerLogIn } from './register';

export const profileModal = document.querySelector('.profile') as HTMLElement;
const buttonProfileLibraryCard = document.querySelector('.reader__button-profile') as HTMLElement;
const profileClose = document.querySelector('.profile__close img') as HTMLElement;
const cardNumberProfile = document.querySelector('.card-number__number') as HTMLElement;
export const cardNumberCopy = document.querySelector('.card-number__icon img') as HTMLElement;
const profileName = document.querySelector('.profile__name') as HTMLElement;
const profileAvatar = document.querySelector('.profile__avatar') as HTMLElement;

export function handleProfileModal(e: MouseEvent) {
  const target = e.target as HTMLElement;

  if (target === buttonProfileLibraryCard || (target === headerLogIn && headerLogIn.textContent === 'My profile')) {
    profileModal?.classList.add('active');
    handleProfileUserInfo();
  }

  if (target === profileClose || target === profileModal) {
    profileModal?.classList.remove('active');
  }
}

export function handleProfileUserInfo() {
  const user = findLogInUser();

  if (user) {
    cardNumberProfile.textContent = user.cardNumber;
    profileName.textContent = `${user.name} ${user.lastName}`;
    profileAvatar.textContent = `${user.name[0]}${user.lastName[0]}`.toUpperCase();
  }
}

export function copyCardNumber() {
  const user = findLogInUser();
  navigator.clipboard
    .writeText(user.cardNumber)
    .then(() => {
      console.log(user.cardNumber);
      cardNumberProfile.textContent = 'Copied!';
      setTimeout(() => {
        cardNumberProfile.textContent = user.cardNumber;
      }, 1000);
    })
    .catch((err) => {
      console.log('Something went wrong', err);
    });
}
