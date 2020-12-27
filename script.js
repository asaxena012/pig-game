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

//Active player
let active = 1;

//initial conditions
totalScore1El.textContent = 0;
totalScore2El.textContent = 0;
currentScore1El.textContent = 0;
currentScore1El.textContent = 0;
diceEl.classList.add('hidden');

//Rolling Dice functionality
btnRoll.addEventListener('click', function () {
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
    active = active === 1 ? 2 : 1;

    box1El.classList.toggle('selected');
    box2El.classList.toggle('selected');
  }
});
