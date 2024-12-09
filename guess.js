const userInput = document.querySelector(".userInput");
const submit = document.querySelector("#subt");
const geussSlot = document.querySelector('.GeussedNum');
const remaining = document.querySelector('.Remaining');
const lowOrHi = document.querySelector(".lowOrHi");
const startOver = document.querySelector('.result')

const p = document.createElement('p');

let randomNum = Math.floor(Math.random() * 100 + 1);
console.log(randomNum);


let prevGuess = [];
let playGame = true;
let numGuess = 1;

if (playGame) {
  submit.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    console.log(guess);
    validate(guess);
  });
}

function validate(guess) {
  if (isNaN(guess)) {
    alert("Please enter a number");
  } else {
    if (guess < 1 || guess > 100) {
      alert("Please enter a number between 1 and 100");
    } else {
      prevGuess.push(guess);
      if (numGuess === 11) {
        displayGuess(guess);
        displayMsg(`GameOver:${randomNum}`);
        endGame();
      } else {
        displayGuess(guess);
        checkGuess(guess);
      }
    }
  }
}


function displayGuess(guess){
  userInput.value = '';
  geussSlot.innerHTML += `${guess},`
  numGuess++;
  remaining.innerHTML = `${11 - numGuess}`
  geussSlot.value = "";
}

function checkGuess(guess) {
  lowOrHi.innerHTML = '';
  if (guess === randomNum) {
    displayMsg("You are right");
    endGame();
  } else if (guess > randomNum) {
    displayMsg("Too high");
  } else if (guess < randomNum) {
    displayMsg("Too low");
  }
}

function displayMsg(message) {
  lowOrHi.innerHTML += `<h2>${message}</h2>`;
}

function endGame() {
  userInput.value = '';
  userInput.setAttribute('disabled', '');
  p.classList.add('button');
  p.innerHTML = `<h2 id="newGame">Start new Game</h2>`;
  startOver.appendChild(p);
  playGame = false;
  newGame();
}

function newGame() {
  const newGameButton = document.querySelector('#newGame');
  newGameButton.addEventListener('click', function (e) {
    randomNum = parseInt(Math.random() * 100 + 1);
    prevGuess = [];
    numGuess = 1;
    geussSlot.innerHTML = '';
    lowOrHi.innerHTML = '';
    p.innerHTML = '';
    remaining.innerHTML = `${11 - numGuess} `;
    userInput.removeAttribute('disabled');
    startOver.removeChild(p);

    playGame = true;
  });
}
