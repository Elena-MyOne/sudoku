export const button1 = document.querySelector('.button-1');
const button2 = document.querySelector('.button-2');
const button4 = document.querySelector('.button-4');
const buttonDots = document.querySelector('.button-dots');
export const buttonPrev = document.querySelector('.prev');
export const buttonNext = document.querySelector('.next');

const buttons = [button2, button4];

export function initButton1(page) {
  button1.textContent = page;
  button1.classList.add('active');
}

function initButton2(page, lastPage) {
  if (page !== lastPage && page < lastPage) {
    button2.textContent = +page + 1;
    button2.classList.remove('hidden');
  } else {
    button2.classList.add('hidden');
  }
}

function initButton4(page, lastPage) {
  if (page < lastPage - 1) {
    button4.textContent = lastPage;
    button4.classList.remove('hidden');
  } else {
    button4.classList.add('hidden');
  }
}

export function initPaginationButtons(page, lastPage) {
  if (lastPage <= 1) {
    initButton1(page);
    buttons.forEach((button) => {
      button.classList.add('hidden');
    });
  } else {
    initButton1(page);
    initButton2(page, lastPage);
    initButton4(page, lastPage);
  }
  toggleButtonDots(lastPage);
  disableButtons(lastPage);
}

function toggleButtonDots(lastPage) {
  if (+button1.textContent === lastPage) {
    buttonDots.classList.add('hidden');
  } else {
    buttonDots.classList.remove('hidden');
  }
}

function disableButtons(lastPage) {
  if (+button1.textContent === 1) {
    buttonPrev.classList.add('disable');
  } else {
    buttonPrev.classList.remove('disable');
  }
  if (+button1.textContent === lastPage) {
    buttonNext.classList.add('disable');
  } else {
    buttonNext.classList.remove('disable');
  }
}
