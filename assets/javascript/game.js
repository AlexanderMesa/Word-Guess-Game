// Declares the variables that will be used
var words = ["notability", "grammarly", "habitminder", "dropbox", "asana", "docusign", "cloze"];
var letters = [];
var wins = 0;
var losses = 0;
var guessesRemaining = 10;

var user_input = document.getElementById("user-input");
var blank_spaces = document.getElementById("blank-spaces");
var guesses_remaining = document.getElementById("guesses-remaining");
var letters_guessed = document.getElementById("letters-guessed")
var wins_text = document.getElementById("wins-text");
var losses_text = document.getElementById("losses-text");

//Randomly Choses a word
var wordChosen = words[Math.floor(Math.random() * words.length)];
for (var i = 0; i < wordChosen.length; i++){
    letters[i] = wordChosen.charAt(i);
}

//Makes the invisible word that the user must guess
var newUserInput = [];
for (var i = 0; i < letters.length; i++){
  newUserInput[i] = document.createElement("div");
  newUserInput[i].textContent = "_";
  newUserInput[i].style.cssFloat = "left";
  user_input.appendChild(newUserInput[i]);
}

//Makes the rest of the text Content
guesses_remaining.textContent = "Guesses Remaining: " + guessesRemaining;
guesses_remaining.style.clear = "both";
letters_guessed.textContent = "Letters Guessed: "
wins_text.textContent = "Wins: " + wins;
losses_text.textContent = "Losses: " + losses;

//Resets the game if the user wins or loses
function resetGame(){
  guessesRemaining = 10;
  letters = [];
  wordChosen = words[Math.floor(Math.random() * words.length)];
  for (var i = 0; i < wordChosen.length; i++){
    letters[i] = wordChosen.charAt(i);
  }

  newUserInput = [];
  for (var i = 0; i < letters.length; i++){
    newUserInput[i] = document.createElement("div");
    newUserInput[i].textContent = "_";
    newUserInput[i].style.cssFloat = "left";
    user_input.appendChild(newUserInput[i]);
  }

  guesses_remaining.textContent = "Guesses Remaining: " + guessesRemaining;
  letters_guessed.textContent = "Letters Guessed: ";
}

// This function is run whenever the user presses a key.
document.onkeyup = function(event) {

  // Determines which key was pressed.
  var userGuess = event.key;

  // Checks the user guess if the letter was not repeated then reduces the guesses remaining if it's incorrect.
  var numRight = 0;
  var numBlanks = 0;
  var newNumBlanks = 0;
  var yesSound = document.getElementById("yes-sound");

  //Checks number of blanks before guess in a turn 
  for (var i = 0; i < letters.length; i++){
    if (newUserInput[i].textContent === "_"){
      numBlanks++;
    }
  }
  //Fills in the blank with the letter the user guessed if it's in the word
  for (var i = 0; i < letters.length; i++){
      if (userGuess === letters[i]){ 
        newUserInput[i].textContent = letters[i];
        numRight++;
      }
  }
  //Checks the number of blanks after guess in a turn
  for (var i = 0; i < letters.length; i++){
    if (newUserInput[i].textContent === "_"){
      newNumBlanks++;
    }
  }
  //Plays a sound if the user guessed the letter right and didn't repeat the letter
  if (newNumBlanks < numBlanks){
    yesSound.play();
  }


  //Reduces the number of guesses by one if the user guesses the wrong letter and didn't repeat the letter
  if (numRight === 0 && letters_guessed.textContent.indexOf(userGuess.toUpperCase() + " ") === -1){
    guessesRemaining--;
    guesses_remaining.textContent = "Guesses Remaining: " + guessesRemaining;
  }

  //Logs the letters guessed if the letter was not repeated and the letter was wrong
  if (letters_guessed.textContent.indexOf(userGuess.toUpperCase() + " ") === -1 && numRight === 0){
    letters_guessed.textContent = letters_guessed.textContent + userGuess.toUpperCase() + " ";
  }
  
  //Checks to see if all the letters are guessed correctly and records it as a win. The word to guess will then be reset.
  if (user_input.textContent.indexOf("_") === -1){
    wins++;
    wins_text.textContent = "Wins: " + wins;
    for (var i = 0; i < letters.length; i++){
      newUserInput[i].textContent = "";
    }
    resetGame();
  }

  //Checks to see if the user has no guesses and records it as a loss. The word to guess will then be reset.
  if (guessesRemaining === 0){
    losses++;
    losses_text.textContent = "Losses: " + losses;
    for (var i = 0; i < letters.length; i++){
      newUserInput[i].textContent = "";
    }
    resetGame();
  }
};