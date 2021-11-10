const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingDisplay = document.querySelector(".remaining span");
const guessMessage = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeHolder(word);

};

getWord();

const placeHolder = function (word) {
    const placeHolderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeHolderLetters.push("●");
    }
    wordInProgress.innerText = placeHolderLetters.join("");
};


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
        countRemainingGuesses(guess);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
};

const showGuessedLetters = function () {
    //Clear the list first
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
    } else { revealWord.push("●");

        }
    }
    wordInProgress.innerText = revealWord.join("");
    checkIfRight();

};

const countRemainingGuesses = function (guess) {
    const upperWord = word.toUpperCase();

    if (!upperWord.includes(guess)) {
       guessMessage.innerText = `Sorry, the word has no ${guess}`
        remainingGuesses -= 1;
    } else {
        guessMessage.innerText = `Good guess! The word has the letter ${guess}`;
    }

    if (remainingGuesses === 0) {
        guessMessage.innerHTML = `Game Over! the word was <span class="highlight">${word}</span?`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingDisplay.innerText = `${remainingGuesses} guesses left`;

    } else {
        remainingDisplay.innerText = `${remainingGuesses} guesses left`;
    }

};

const checkIfRight = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        guessMessage.classList.add("win");
        guessMessage.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;

        startOver();
    }
};

const startOver = function () {
    guessButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");

};

playAgainButton.addEventListener("click", function () {
    guessMessage.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    remainingDisplay.innerText = `${remainingGuesses} guesses left`;
    guessedLettersElement.innerHTML = "";
    guessMessage.innerText = "";

    getWord();

    guessButton.classList.remove("hide");
    playAgainButton.classList.add("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");

});

