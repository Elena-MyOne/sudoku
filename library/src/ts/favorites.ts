export const buttons = document.querySelector('.favorites__buttons') as HTMLElement;
const cards = document.querySelectorAll('.favorites__cards') as NodeListOf<HTMLDivElement>;

export function handleFavoritesButtonsClick(e: MouseEvent) {
  const target = e.target as HTMLElement;
  const inputTarget = e.target as HTMLInputElement;

  if (target.closest('.favorites__input')) {
    cards.forEach((item) => {
      if (item.classList.contains(inputTarget.value)) {
        item.style.display = 'grid';
        item.style.opacity = '1';
      } else {
        item.style.opacity = '0';
        item.style.display = 'none';
      }
    });
  }
}
