const movesCount = document.querySelector('.moves-count');
let moves = 0;

export function showMovesCount() {
  movesCount.innerHTML = moves;
}
