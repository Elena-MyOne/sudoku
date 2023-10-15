const ceilAudio = new Audio('assets/audio/click.mp3');
const resultsAudio = new Audio('assets/audio/results.wav');
const winAudio = new Audio('assets/audio/win.mp3');
const startAudio = new Audio('assets/audio/start.mp3');
const clickAudio = new Audio('assets/audio/click-2.wav');

export const sound = document.querySelector('.sound');

export function playCeilAudio() {
  ceilAudio.play();
  ceilAudio.volume = 0.4;
}

export function playClickAudio() {
  clickAudio.play();
  clickAudio.volume = 0.4;
}

export function playStartAudio() {
  startAudio.play();
}

export function playResultsAudio() {
  resultsAudio.play();
  resultsAudio.volume = 0.4;
}

export function playWinAudio() {
  winAudio.play();
}

function muteGame() {
  ceilAudio.muted = true;
  clickAudio.muted = true;
  startAudio.muted = true;
  resultsAudio.muted = true;
  winAudio.muted = true;
}

function playGameAudio() {
  ceilAudio.muted = false;
  clickAudio.muted = false;
  startAudio.muted = false;
  resultsAudio.muted = false;
  winAudio.muted = false;
}

function toggleSound() {
  sound.classList.toggle('active');

  if (sound.classList.contains('active')) {
    playGameAudio();
  } else {
    muteGame();
  }
}

sound.addEventListener('click', toggleSound);
