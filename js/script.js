const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingDisplay = document.querySelector(".remaining span");
const guessMessage = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

const placeHolder = function (word) {
    const placeHolderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeHolderLetters.push("●");
    }
    wordInProgress.innerText = placeHolderLetters.join("");
};

placeHolder(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    guessMessage.innerText = "";
    const guess = letterInput.value;
    letterInput.value = "";
   const goodGuess = validateInput(guess);
   if (goodGuess) {
       makeGuess(guess);
   }
   
});


const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        guessMessage.innerText = "Please enter a letter";
    } else if (input.length > 1) {
        guessMessage.innerText = "Guess only one letter at a time";
    } else if (!input.match(acceptedLetter)) {
        guessMessage.innerText = "Please enter a letter from A to Z"
    } else {
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        guessMessage.innerText = "You already guessed that letter. Try again";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
}