document.addEventListener('DOMContentLoaded', function () {
  // load all code after the DOM
  function getComputerChoice () {
  // get random number between 0 and 3
  // and index the VALID_CHOICES array
    const choice = Math.floor(Math.random() * 3)
    return VALID_CHOICES[choice]
  }

  const VALID_CHOICES = ['rock', 'paper', 'scissors']

  const computerChoice = getComputerChoice()

  console.log(computerChoice)
})
