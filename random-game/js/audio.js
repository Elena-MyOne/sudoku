const ceilAudio = new Audio('assets/audio/click.mp3');
const resultsAudio = new Audio('assets/audio/results.wav');
const winAudio = new Audio('assets/audio/win.mp3');
const startAudio = new Audio('assets/audio/start.mp3');
const clickAudio = new Audio('assets/audio/click-2.wav');

export function playCeilAudio() {
  ceilAudio.play();
  ceilAudio.volume = 0.4;
}

export function playClickAudio() {
  clickAudio.play();
  ceilAudio.volume = 0.4;
}

export function playStartAudio() {
  startAudio.play();
}

export function playResultsAudio() {
  resultsAudio.play();
  ceilAudio.volume = 0.4;
}

export function playWinAudio() {
  winAudio.play();
}
