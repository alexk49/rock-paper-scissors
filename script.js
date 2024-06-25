function getComputerChoice () {
// get random number between 0 and 3
// and index the VALID_CHOICES array
  const choice = Math.floor(Math.random() * 3)
  return VALID_CHOICES[choice]
}

function computerWins (playerChoice, computerChoice, computerScore) {
// log computer winner
  resultDiv.textContent = ('You lose: ' + computerChoice + ' beats ' + playerChoice)
  return (computerScore += 1)
}

function playerWins (playerChoice, computerChoice, humanScore) {
// log player winner
  resultDiv.textContent = ('You win: ' + playerChoice + ' beats ' + computerChoice)
  return (humanScore += 1)
}

function draw (playerChoice, computerChoice) {
// log draw
  resultDiv.textContent = ("It's a draw - player went: " + playerChoice + ' and computer went: ' + computerChoice)
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

function clearBoard () {
  resultDiv.innerText = ''

  const scoreDivs = document.querySelectorAll('.score')

  scoreDivs.forEach((score) => {
    score.innerText = ''
  })
  playerScore = 0
  computerScore = 0
}

function playGame (playerChoice) {
  const computerChoice = getComputerChoice()
  playRound(playerChoice, computerChoice, playerScore, computerScore)

  const scores = playRound(playerChoice, computerChoice, playerScore, computerScore)

  playerScore = scores[0]
  computerScore = scores[1]

  playerScoreDiv.textContent = 'player: ' + playerScore
  computerScoreDiv.textContent = 'computer: ' + computerScore

  const winner = checkForRoundWinner(playerScore, computerScore)

  if (winner === 'computer' || winner === 'player') {
    const again = writeFinalScore(winner)
    if (again) {
      clearBoard()
    }
  }
};

function checkForRoundWinner (playerScore, computerScore) {
  if (computerScore === 5) {
    return 'computer'
  } else if (playerScore === 5) {
    return 'player'
  } else if (playerScore > 5 || computerScore > 5) {
    panic()
  } else {
    return false
  }
};

function panic () {
  const panicMessages = ['oh no', 'hey stop that', 'this is not how the game is meant to be played', 'PANICCCCCCCCCCCC', 'please stop']
  const panicDiv = document.querySelector('#panic')
  const index = [Math.floor(Math.random() * panicMessages.length)]
  panicDiv.innerText = panicMessages[index]
}

function writeFinalScore (winner) {
  const finalScoreDiv = document.querySelector('#final-score')
  let again = ''
  if (winner === 'computer') {
    finalScoreDiv.innerText = 'You lost the game to the computer. Bad luck.'
    again = confirm('You lost the game to the computer. Bad luck. Play again?')
  } else {
    finalScoreDiv.innerText = 'You won the game!'
    again = confirm('You won the game! play again?')
  }
  return again
};

const VALID_CHOICES = ['rock', 'paper', 'scissors']

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
    playGame(playerChoice)
  }
  )
})
