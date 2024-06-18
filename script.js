function getComputerChoice () {
// get random number between 0 and 3
// and index the VALID_CHOICES array
  const choice = Math.floor(Math.random() * 3)
  return VALID_CHOICES[choice]
}

function getHumanChoice () {
// get play choice of valid choices
  let choice = ''
  while (VALID_CHOICES.includes(choice) === false) {
    choice = prompt('rock, paper, scissors?').toLowerCase()
  }
  return choice
}

function computerWins (playerChoice, computerChoice, computerScore) {
// log computer winner
  resultDiv.textContent = ('You lose: ' + computerChoice + ' beats ' + playerChoice)
  console.log('You lose!', computerChoice, 'beats:', playerChoice)
  return (computerScore += 1)
}

function playerWins (playerChoice, computerChoice, humanScore) {
// log player winner
  resultDiv.textContent = ('You win: ' + playerChoice + ' beats ' + computerChoice)
  console.log('You win!', playerChoice, 'beats:', computerChoice)
  return (humanScore += 1)
}

function draw (playerChoice, computerChoice) {
// log draw
  resultDiv.textContent = ("It's a draw - player went: " + playerChoice + ' and computer went: ' + computerChoice)
  console.log("It's a draw - player went:", playerChoice, 'and computer went', computerChoice)
}

function playRound (playerChoice, computerChoice, playerScore, computerScore) {
// rock beats paper but loses to paper
// paper beats rock but loses to scissors
// scissors beats paper but loses to rock
  if (playerChoice === computerChoice) {
    draw(playerChoice, computerChoice)
  } else if (playerChoice === 'rock' && computerChoice !== 'paper') {
    playerScore = playerWins(playerChoice, computerChoice, playerScore)
  } else if (playerChoice === 'paper' && computerChoice !== 'scissors') {
    playerScore = playerWins(playerChoice, computerChoice, playerScore)
  } else if (playerChoice === 'scissors' && computerChoice !== 'rock') {
    playerScore = playerWins(playerChoice, computerChoice, playerScore)
  } else {
    computerScore = computerWins(playerChoice, computerChoice, computerScore)
  }
  return [playerScore, computerScore]
}

function playGame () {
  // play whole game of 5 rounds
  let round = 1

  let playerScore = 0
  let computerScore = 0

  while (round < 5) {
    console.log("let's play!")

    const computerChoice = getComputerChoice()

    const playerChoice = getHumanChoice()

    console.log('Computer choice:', computerChoice)
    console.log('player choice:', playerChoice)

    const scores = playRound(playerChoice, computerChoice, playerScore, computerScore)

    playerScore = scores[0]
    computerScore = scores[1]

    round += 1

    console.log("it's round:", round)
    console.log('Your score is:', playerScore)
    console.log('Computer score is:', computerScore)

    console.log('final scores. Computer:', computerScore, 'player:', playerScore)
  }
};

function checkForRoundWinner (playerScore, computerScore) {
  if (computerScore === 5) {
    console.log('computer wins round')
    alert('COMPUTER WINS ROUND!')
  } else if (playerScore === 5) {
    console.log('player wins round')
    alert('PLAYER WINS ROUND!')
  } else {
    return false
  }
};

const VALID_CHOICES = ['rock', 'paper', 'scissors']

// playGame()

const choiceButtons = document.querySelectorAll('.choice')

const resultDiv = document.querySelector('#result')
const playerScoreDiv = document.querySelector('#player-score')
const computerScoreDiv = document.querySelector('#computer-score')

let playerScore = 0
let computerScore = 0

choiceButtons.forEach((button) => {
  // create click listener for each button
  button.addEventListener('click', () => {
    const playerChoice = button.id
    const computerChoice = getComputerChoice()
    playRound(playerChoice, computerChoice, playerScore, computerScore)

    const scores = playRound(playerChoice, computerChoice, playerScore, computerScore)

    playerScore = scores[0]
    computerScore = scores[1]

    playerScoreDiv.textContent = 'player: ' + playerScore
    computerScoreDiv.textContent = 'computer: ' + computerScore

    checkForRoundWinner(playerScore, computerScore)
  })
})
