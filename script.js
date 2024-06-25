function getComputerChoice () {
// get random number between 0 and 3
// and index the VALID_CHOICES array
  const choice = Math.floor(Math.random() * 3)
  return VALID_CHOICES[choice]
}

function computerWins (playerChoice, computerChoice, computerScore) {
  // log computer winner
  const computerWinMessage = ('You lose: ' + computerChoice + ' beats ' + playerChoice)

  if (resultDiv.textContent === computerWinMessage) {
    resultDiv.textContent = ("You lose again, you're really not good at this. " + computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1) + ' beats ' + playerChoice)
  } else {
    resultDiv.textContent = computerWinMessage
  }
  return (computerScore += 1)
}

function playerWins (playerChoice, computerChoice, humanScore) {
// log player winner
  const winMessage = ('You win: ' + playerChoice + ' beats ' + computerChoice)
  if (resultDiv.textContent === winMessage) {
    // first letter of playerChoice has to be capitalised in message
    resultDiv.textContent = ("You win again, you're getting good at this! " + playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1) + ' beats ' + computerChoice)
  } else {
    resultDiv.textContent = ('You win: ' + playerChoice + ' beats ' + computerChoice)
  }
  return (humanScore += 1)
}

function draw (playerChoice, computerChoice) {
  // log draw
  const drawMessage = ("It's a draw - player went " + playerChoice + ' and computer went ' + computerChoice)
  if (resultDiv.textContent === drawMessage) {
    resultDiv.textContent = ("It's another draw! Player went " + playerChoice + ' and computer went ' + computerChoice)
  } else {
    resultDiv.textContent = drawMessage
  }
};

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

function resetGame () {
  winnerDeclared = false
  resultDiv.innerText = ''
  panicDiv.innerText = ''
  const scoreDivs = document.querySelectorAll('.score')

  scoreDivs.forEach((score) => {
    score.innerText = ''
  })
  playerScore = 0
  computerScore = 0
}

function playGame (playerChoice) {
  const computerChoice = getComputerChoice()

  const scores = playRound(playerChoice, computerChoice, playerScore, computerScore)

  playerScore = scores[0]
  computerScore = scores[1]

  playerScoreDiv.textContent = 'player: ' + playerScore
  computerScoreDiv.textContent = 'computer: ' + computerScore

  const winner = checkForRoundWinner(playerScore, computerScore)

  if (winner === 'computer' || winner === 'player') {
    const again = writeFinalScore(winner, winnerDeclared)
    winnerDeclared = true
    if (again) {
      resetGame()
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
  const panicMessages = ['oh no', 'hey stop that', 'this is not how the game is meant to be played', 'PANICCCCCCCCCCCC', 'please stop', "IT'S MEANT TO BE A GAME TO FIVE", 'pLeASe PREsS ThE rESeT BuTtON']
  const index = [Math.floor(Math.random() * panicMessages.length)]
  panicDiv.innerText = panicMessages[index]
}

function writeFinalScore (winner, winnerDeclared) {
  if (winnerDeclared === true) {
    panic()
  } else {
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
  }
};

const VALID_CHOICES = ['rock', 'paper', 'scissors']

const choiceButtons = document.querySelectorAll('.choice')

const resultDiv = document.querySelector('#result')
const playerScoreDiv = document.querySelector('#player-score')
const computerScoreDiv = document.querySelector('#computer-score')
const panicDiv = document.querySelector('#panic')

// needed to make panic messages show consistently
let winnerDeclared = false
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

const resetButton = document.querySelector('#reset')
resetButton.addEventListener('click', () => {
  resetGame()
})
