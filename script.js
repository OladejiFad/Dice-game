let score = JSON.parse(localStorage.getItem('score'));

if (!score) {
  score = {
    You: 0,
    Computer: 0,
    Ties: 0
  };
}




function rollDice() {
  const userRoll = Math.floor(Math.random() * 6) + 1;
  const computerRoll = Math.floor(Math.random() * 6) + 1;

  // Roll the dice for both user and computer
  roll(userRoll, 'user');
  roll(computerRoll, 'computer');



  // Determine the winner
  resultText = '';


  if (userRoll > computerRoll) {
    resultText = 'You win! 💪';

  } else if (userRoll < computerRoll) {
    resultText = 'Computer wins! 🤣';

  } else {
    resultText = 'It\'s a tie! 🤜🤛';
  }





  if (resultText === 'You win! 💪') {
    score.You += 1;

  } else if (resultText === 'Computer wins! 🤣') {
    score.Computer += 1;

  } else if (resultText === 'It\'s a tie! 🤜🤛') {
    score.Ties += 1;
  };



  document.getElementById('result').textContent = resultText;

  document.getElementById('user-score').textContent = `You: ${score.You} `;

  document.getElementById('computer-score').textContent = `Computer: ${score.Computer}`;

  document.getElementById('ties').textContent = `Ties: ${score.Ties}`;

  localStorage.setItem('score', JSON.stringify(score));
}




function resetButton() {

  score.You = 0;
  score.Computer = 0;
  score.Ties = 0;
  localStorage.removeItem('score');
  alert(`Game has been restarted
Scores will be refresh on the next ROLL 😊`)
}



function roll(number, player) {

  document.addEventListener('DOMContentLoaded', function () {
    const jumpButton = document.getElementById('jumpBotton');

    const userDice = document.getElementById('user-dice');

    const computerDice = document.getElementById('computer-dice');

    jumpButton.addEventListener('click', function () {
      userDice.classList.add('jump');
      computerDice.classList.add('jump');
    })

    setTimeout(function () {
      userDice.classList.remove('jump');
      computerDice.classList.remove('jump');
    }, 1000);

  });
  // Get the corresponding dice container (user or computer)
  const dice = document.getElementById(player + '-dice');
  const dots = dice.querySelectorAll('.dot');

  // Hide all dots initially
  dots.forEach(dot => dot.style.display = 'none');

  // Show the appropriate dots based on the rolled number
  switch (number) {
    case 1:
      document.querySelector(`#${player}-dice .middle-center`).style.display = 'block';
      break;
    case 2:
      document.querySelector(`#${player}-dice .top-left`).style.display = 'block';
      document.querySelector(`#${player}-dice .bottom-right`).style.display = 'block';
      break;
    case 3:
      document.querySelector(`#${player}-dice .top-left`).style.display = 'block';
      document.querySelector(`#${player}-dice .middle-center`).style.display = 'block';
      document.querySelector(`#${player}-dice .bottom-right`).style.display = 'block';
      break;
    case 4:
      document.querySelector(`#${player}-dice .top-left`).style.display = 'block';
      document.querySelector(`#${player}-dice .top-right`).style.display = 'block';
      document.querySelector(`#${player}-dice .bottom-left`).style.display = 'block';
      document.querySelector(`#${player}-dice .bottom-right`).style.display = 'block';
      break;
    case 5:
      document.querySelector(`#${player}-dice .top-left`).style.display = 'block';
      document.querySelector(`#${player}-dice .top-right`).style.display = 'block';
      document.querySelector(`#${player}-dice .middle-center`).style.display = 'block';
      document.querySelector(`#${player}-dice .bottom-left`).style.display = 'block';
      document.querySelector(`#${player}-dice .bottom-right`).style.display = 'block';
      break;
    case 6:
      document.querySelector(`#${player}-dice .top-left`).style.display = 'block';
      document.querySelector(`#${player}-dice .top-center`).style.display = 'block';
      document.querySelector(`#${player}-dice .top-right`).style.display = 'block';
      document.querySelector(`#${player}-dice .bottom-left`).style.display = 'block';
      document.querySelector(`#${player}-dice .bottom-center`).style.display = 'block';
      document.querySelector(`#${player}-dice .bottom-right`).style.display = 'block';
      break;
  }



}