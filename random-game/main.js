import { initBoardGame, setGameLevel, restart } from './js/board.js';
import { populateDigits, digits, showMovesCount, solveButton } from './js/buildGame.js';
import { successPopUp } from './js/popUps.js';
import { gameTime, resetTimer } from './js/timer.js';
import { resultsButton } from './js/results.js';
import { sound } from './js/audio.js';

const levelsContainer = document.querySelector('.levels');

function initGame() {
  showMovesCount();
  populateDigits();
  initBoardGame();
}

initGame();

document.addEventListener('load', initBoardGame);
levelsContainer.addEventListener('click', setGameLevel);

console.log(
  `Cудоку генерируется рандомно, с учетом правил игры, и того что для каждого пазла должно быть всего одно возможное решение \n\nЕсть несколько уровней игры и статистика выводиться для каждого из них отдельно \n\nДля удобства проверки в верху есть волшебная кнопка, решить судоку: "Solve". Если ее нажать пазл решится автоматически и в статистике проявиться запись 100 ходов, такое-то время. Лучший результат сортируется по количеству ходов.\n\nПравила игры: \n1. В каждом ряду, строке и поле 3х3 должны располагаться цифры от 1 до 9 без повторений. \n2. Нужно заполнить цифрами все поле. \n3. Если допущена ошибка, цифра подсвечивается красным. \n4. Чтобы удалить неверный ход можно нажать кнопку "erase" или выбрать другую цифру и подстать ее.`
);
