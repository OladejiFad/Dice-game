let score = JSON.parse(localStorage.getItem('score')) || { Player1: 0, Player2: 0, Ties: 0 };
let player1Roll = null;
let player2Roll = null;

const player1Btn = document.getElementById('player1-roll');
const player2Btn = document.getElementById('player2-roll');
const player1Dice = document.getElementById('player1-dice');
const player2Dice = document.getElementById('player2-dice');

function updateActivePlayer() {
  player1Dice.classList.toggle('active', !player1Btn.disabled);
  player2Dice.classList.toggle('active', !player2Btn.disabled);
}

player1Btn.addEventListener('click', () => {
  player1Roll = rollDice('player1-dice');
  player1Btn.disabled = true;
  player2Btn.disabled = false;
  updateActivePlayer();
});

player2Btn.addEventListener('click', () => {
  player2Roll = rollDice('player2-dice');
  player2Btn.disabled = true;
  player1Btn.disabled = false;

  setTimeout(determineWinner, 600);
  updateActivePlayer();
});

function rollDice(playerId) {
  const rollValue = Math.floor(Math.random() * 6) + 1;
  const diceElement = document.getElementById(playerId);
  animateRoll(diceElement, rollValue);
  return rollValue;
}

function animateRoll(diceElement, number) {
  const rollSound = document.getElementById('roll-sound');
  rollSound.currentTime = 0;
  rollSound.play();

  // Add rolling animation
  diceElement.classList.add('rolling');

  // After animation ends, show face instantly
  setTimeout(() => {
    diceElement.classList.remove('rolling');
    showDiceFace(diceElement, number); // show all dots at once
  }, 500);
}

function showDiceFace(diceElement, number) {
  const dots = diceElement.querySelectorAll('.dot');
  dots.forEach(dot => dot.style.display = 'none');

  switch (number) {
    case 1: diceElement.querySelector('.middle-center').style.display = 'block'; break;
    case 2:
      diceElement.querySelector('.top-left').style.display = 'block';
      diceElement.querySelector('.bottom-right').style.display = 'block';
      break;
    case 3:
      diceElement.querySelector('.top-left').style.display = 'block';
      diceElement.querySelector('.middle-center').style.display = 'block';
      diceElement.querySelector('.bottom-right').style.display = 'block';
      break;
    case 4:
      diceElement.querySelector('.top-left').style.display = 'block';
      diceElement.querySelector('.top-right').style.display = 'block';
      diceElement.querySelector('.bottom-left').style.display = 'block';
      diceElement.querySelector('.bottom-right').style.display = 'block';
      break;
    case 5:
      diceElement.querySelector('.top-left').style.display = 'block';
      diceElement.querySelector('.top-right').style.display = 'block';
      diceElement.querySelector('.middle-center').style.display = 'block';
      diceElement.querySelector('.bottom-left').style.display = 'block';
      diceElement.querySelector('.bottom-right').style.display = 'block';
      break;
    case 6:
      diceElement.querySelector('.top-left').style.display = 'block';
      diceElement.querySelector('.top-center').style.display = 'block';
      diceElement.querySelector('.top-right').style.display = 'block';
      diceElement.querySelector('.bottom-left').style.display = 'block';
      diceElement.querySelector('.bottom-center').style.display = 'block';
      diceElement.querySelector('.bottom-right').style.display = 'block';
      break;
    default: break; // 0 -> hide all dots
  }
}


function animateDots(diceElement) {
  const visibleDots = Array.from(diceElement.querySelectorAll('.dot'))
    .filter(dot => dot.style.display === 'block');
  visibleDots.forEach((dot, index) => {
    setTimeout(() => {
      dot.classList.add('jump');
      setTimeout(() => dot.classList.remove('jump'), 400);
    }, index * 100);
  });
}

function determineWinner() {
  let resultText = '';
  if (player1Roll > player2Roll) {
    resultText = 'Player 1 wins! 🎉';
    score.Player1++;
  } else if (player2Roll > player1Roll) {
    resultText = 'Player 2 wins! 🎉';
    score.Player2++;
  } else {
    resultText = "It's a tie! 🤝";
    score.Ties++;
  }

  document.getElementById('result').textContent = resultText;
  document.getElementById('player1-score').textContent = `Player 1: ${score.Player1}`;
  document.getElementById('player2-score').textContent = `Player 2: ${score.Player2}`;
  document.getElementById('ties').textContent = `Ties: ${score.Ties}`;

  localStorage.setItem('score', JSON.stringify(score));
}

function resetButton() {
  score = { Player1: 0, Player2: 0, Ties: 0 };
  player1Roll = null;
  player2Roll = null;

  player1Btn.disabled = false;
  player2Btn.disabled = true;
  localStorage.removeItem('score');

  document.getElementById('result').textContent = '';
  document.getElementById('player1-score').textContent = 'Player 1: 0';
  document.getElementById('player2-score').textContent = 'Player 2: 0';
  document.getElementById('ties').textContent = 'Ties: 0';

  [player1Dice, player2Dice].forEach(dice => {
    dice.classList.add('shake');
    setTimeout(() => {
      dice.classList.remove('shake');
      showDiceFace(dice, 0); // hide all dots
    }, 600);
  });

  updateActivePlayer();
}

// initialize
player1Btn.disabled = false;
player2Btn.disabled = true;
showDiceFace(player1Dice, 0);
showDiceFace(player2Dice, 0);
updateActivePlayer();
