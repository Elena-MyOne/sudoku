import { TRACKS } from './tracks.js';
import { getTimeCodeFromNum } from './utils/getTimeCodeFromNumber.js';

const play = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#ffffff"><path d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
`;

const pause = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#ffffff"><path d="M360-320h80v-320h-80v320Zm160 0h80v-320h-80v320ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
`;

const volume = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#ffffff"><path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z"/></svg>
`;

const volumeOff = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#ffffff"><path d="M792-56 671-177q-25 16-53 27.5T560-131v-82q14-5 27.5-10t25.5-12L480-368v208L280-360H120v-240h128L56-792l56-56 736 736-56 56Zm-8-232-58-58q17-31 25.5-65t8.5-70q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 53-14.5 102T784-288ZM650-422l-90-90v-130q47 22 73.5 66t26.5 96q0 15-2.5 29.5T650-422ZM480-592 376-696l104-104v208Zm-80 238v-94l-72-72H200v80h114l86 86Zm-36-130Z"/></svg>
`;

const title = document.querySelector('.title');
const artistCover = document.querySelector('.artist-cover');
const background = document.querySelector('.background');
const playButton = document.querySelector('.play-button');
const artist = document.querySelector('.artist');
const duration = document.querySelector('.duration');
const currentTime = document.querySelector('.current-time');
const barSlider = document.querySelector('.bar-slider');
const bar = document.querySelector('.bar');
const prevTrack = document.querySelector('.prev-button');
const nextTrack = document.querySelector('.next-button');
const volumeIcon = document.querySelector('.volume-icon');
const volumeBar = document.querySelector('.volume-bar');
const volumeSlider = document.querySelector('.volume-slider');
const playlist = document.querySelector('.playlist');

let isPlaying = false;

let track = 0;
let currentTimePlay = 0;

const audio = new Audio();
audio.volume = 0.5;
volumeSlider.value = 50;

const generateTrack = (currentTrack) => {
  background.setAttribute('src', `${currentTrack.background}`);
  title.textContent = currentTrack.name;
  artistCover.setAttribute('src', `${currentTrack.image}`);
  artist.textContent = `${currentTrack.artist}`;
  duration.textContent = `${currentTrack.duration}`;
  audio.src = currentTrack.src;
};

generateTrack(TRACKS[track]);

const renderPlayList = () => {
  const playlistItems = TRACKS.map(
    (item) => `<li class="playlist-item" data-id="${item.id}">${item.name} - ${item.artist}<li/>`
  ).join('');
  playlist.innerHTML = `${playlistItems}`;
  setActivePlayListItem();
};

renderPlayList();

function setActivePlayListItem() {
  const playlistItems = document.querySelectorAll('.playlist-item');
  if (playlistItems.length !== 0) {
    playlistItems.forEach((item) => {
      item.classList.remove('active');
      if (item.dataset.id == track + 1) {
        item.classList.add('active');
      }
    });
  }
}

function handleTrack() {
  if (isPlaying) {
    pauseTrack();
  } else {
    playTrack();
  }
}

function playTrack() {
  playButton.innerHTML = pause;
  audio.currentTime = currentTimePlay;
  audio.play();
  isPlaying = true;
}

function pauseTrack() {
  playButton.innerHTML = play;
  audio.pause();
  isPlaying = false;
  currentTimePlay = audio.currentTime;
}

function setTrackCurrentTime() {
  const time = audio.currentTime;
  const timePast = getTimeCodeFromNum(time);
  currentTime.textContent = timePast;
}

function updateProgressBar(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  bar.style.width = `${progressPercent}%`;
  barSlider.value = progressPercent;
}

function setProgressBar(e) {
  const newTime = (this.value / 100) * audio.duration;
  audio.currentTime = newTime;
  currentTimePlay = newTime;
}

function setVolumeBar(e) {
  const volumeValue = this.value / 100;
  audio.volume = volumeValue;
  volumeBar.style.width = `${this.value}%`;
}

function playNextTrack() {
  track < 5 ? (track += 1) : (track = 0);
  currentTimePlay = 0;
  generateTrack(TRACKS[track]);
  playTrack();
  setActivePlayListItem();
}

function playPrevTrack() {
  track <= 0 ? (track = 5) : (track -= 1);
  currentTimePlay = 0;
  generateTrack(TRACKS[track]);
  playTrack();
  setActivePlayListItem();
}

function mutedAudio() {
  if (audio.muted) {
    audio.muted = false;
    volumeIcon.innerHTML = volume;
  } else {
    audio.muted = true;
    volumeIcon.innerHTML = volumeOff;
  }
}

function setActiveTrack(e) {
  const target = e.target;
  if (target.classList.contains('playlist-item')) {
    track = target.dataset.id - 1;
    currentTimePlay = 0;
    generateTrack(TRACKS[track]);
    playTrack();
    setActivePlayListItem();
  }
}

setInterval(setTrackCurrentTime, 1000);

playButton.addEventListener('click', handleTrack);
audio.addEventListener('timeupdate', updateProgressBar);
barSlider.addEventListener('input', setProgressBar);
nextTrack.addEventListener('click', playNextTrack);
prevTrack.addEventListener('click', playPrevTrack);
volumeIcon.addEventListener('click', mutedAudio);
volumeSlider.addEventListener('input', setVolumeBar);
playlist.addEventListener('click', setActiveTrack);

console.log(
  `Извиняюсь за выбор музыки, мне нравиться потяжелее. \n\nДополнительный не предусмотренный в задании функционал: 1. Есть возможность настраивать громкость(по умолчанию стоить на 50%) \n2. Можно отключить звук, если кликнуть на соответствующую иконку \n3. Отображается список треков \n4.Если кликнуть на любой из треков в списке он выделяется как активный и начинает проигрываться`
);
