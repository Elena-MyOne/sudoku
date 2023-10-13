const timer = document.querySelector('.time-count');

let timeCounter = 0;
export let gameTime = null;

export function formatSeconds(seconds) {
  const date = new Date(1970, 0, 1);
  date.setSeconds(seconds);
  return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
}

function initGameTime() {
  setInterval(() => {
    timer.innerHTML = `${formatSeconds(++timeCounter)}`;
  }, 1000);
}

export function resetTimer() {
  timeCounter = -1;
  clearInterval(gameTime);
}

window.addEventListener('load', () => {
  gameTime = initGameTime();
});
