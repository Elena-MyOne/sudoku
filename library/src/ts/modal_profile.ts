import { headerLogIn } from './register';

export const profileModal = document.querySelector('.profile') as HTMLElement;
const buttonProfileLibraryCard = document.querySelector('.reader__button-profile') as HTMLElement;
const profileClose = document.querySelector('.profile__close img') as HTMLElement;

export function handleProfileModal(e: MouseEvent) {
  const target = e.target as HTMLElement;

  if (target === buttonProfileLibraryCard || (target === headerLogIn && headerLogIn.textContent === 'My profile')) {
    profileModal?.classList.add('active');
  }

  if (target === profileClose || target === profileModal) {
    profileModal?.classList.remove('active');
  }
}
