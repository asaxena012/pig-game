'use strict';

//Selecting elements

const totalScore1El = document.querySelector('.totalScore1');
const totalScore2El = document.querySelector('.totalScore2');
const currentScore1El = document.querySelector('.currentScore1');
const currentScore2El = document.querySelector('.currentScore2');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.newGame');
const btnRoll = document.querySelector('.rollDice');
const btnHold = document.querySelector('.hold');
const box1El = document.querySelector('.box1');
const box2El = document.querySelector('.box2');

//Data variables
let cScore = 0;
let tScore1 = 0;
let tScore2 = 0;

//Active player
let active = 1;

//initial conditions
totalScore1El.textContent = 0;
totalScore2El.textContent = 0;
currentScore1El.textContent = 0;
currentScore1El.textContent = 0;
diceEl.classList.add('hidden');
document.querySelector('.winner1').classList.add('hidden');
document.querySelector('.winner2').classList.add('hidden');
let playing = true; //State variable
box1El.classList.add('selected');

//Switch Player function
const switchPlayer = function () {
  active = active === 1 ? 2 : 1;

  box1El.classList.toggle('selected');
  box2El.classList.toggle('selected');

  console.log(active);
};

//Rolling Dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //Display dice roll
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //Check for 1
    if (dice !== 1) {
      cScore += dice;
      document.querySelector(`.currentScore${active}`).textContent = cScore;
    } else {
      //Current score 0, current active player's score also 0
      document.querySelector(`.currentScore${active}`).textContent = 0;
      cScore = 0;

      //Switch Player
      switchPlayer();
    }
  }
});

//Hold Functionality
btnHold.addEventListener('click', function () {
  //Transfer active player's current score to its total score
  if (active === 1) {
    tScore1 += cScore;
    totalScore1El.textContent = tScore1;
    currentScore1El.textContent = 0;
  } else {
    tScore2 += cScore;
    totalScore2El.textContent = tScore2;
    currentScore2El.textContent = 0;
  }

  cScore = 0;

  //Check if active player has won
  if (Number(document.querySelector(`.totalScore${active}`).textContent) >= 100) {
    document.querySelector(`.winner${active}`).classList.remove('hidden');
    document
      .querySelector(`.box${active === 1 ? 2 : 1}`)
      .classList.add('loser');

    playing = false;
    diceEl.classList.add('hidden');
  } else {
    //Switch Player
    switchPlayer();
  }
});

//Reset Functionality
btnNew.addEventListener('click', function () {
  totalScore1El.textContent = 0;
  totalScore2El.textContent = 0;
  currentScore1El.textContent = 0;
  currentScore1El.textContent = 0;
  diceEl.classList.add('hidden');
  document.querySelector('.winner1').classList.add('hidden');
  document.querySelector('.winner2').classList.add('hidden');
  playing = true; //State variable
  //Data variables
  cScore = 0;
  tScore1 = 0;
  tScore2 = 0;

  //Active player
  document.querySelector(`.winner${active}`).classList.add('hidden');
  document
    .querySelector(`.box${active === 1 ? 2 : 1}`)
    .classList.remove('loser');

  active = 1;
  box1El.classList.add('selected');
  box2El.classList.remove('selected');
});

//Rules modal functionality
const btnRules = document.querySelector('.rules');

btnRules.addEventListener('click', function () {
  document.querySelector('.rulesModal').classList.remove('hidden');
  document.querySelector('.overlay').classList.remove('hidden');
});

//Close rules functionalities
const btnClose = document.querySelector('.close-modal');

btnClose.addEventListener('click', function () {
  document.querySelector('.rulesModal').classList.add('hidden');
  document.querySelector('.overlay').classList.add('hidden');
});

document.addEventListener('keydown', function (e) {
  if (
    e.key == 'Escape' &&
    !document.querySelector('.rulesModal').classList.contains('hidden')
  ) {
    document.querySelector('.rulesModal').classList.add('hidden');
    document.querySelector('.overlay').classList.add('hidden');
  }
});

document.querySelector('.overlay').addEventListener('click', function () {
  document.querySelector('.rulesModal').classList.add('hidden');
  document.querySelector('.overlay').classList.add('hidden');
});
