
// global variables
let words = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen'];
let guessesRemaining = 15;
let lettersGuessed = [];
let gameState = false;
let wordInPlay = '';
let hitCount = 0;

// element variables
let currWord = document.getElementById("current_word");
let spentLetters = document.getElementById("spent_letters");

//loop through letters of word and place in separate divs

function displayWord (word) {
    for (let i = 0; i < word.length; i++) {
        let letter = document.createElement("div");
        let letterBox = document.createElement("div");
        letter.classList.add("word_letter");
        letter.id = ("letter_" + i);
        letter.textContent = word[i].toUpperCase();
        letterBox.classList.add("letter_box");
        letterBox.appendChild(letter);
        currWord.appendChild(letterBox);
    }  
}

function showGuessedLetter () {
    let spentLetter = document.createElement("div");
    spentLetter.classList.add("letter_spent");
    spentLetter.textContent = lettersGuessed[lettersGuessed.length - 1];
    spentLetters.appendChild(spentLetter);
}

function clearGame () {
    gameState = false;
    wordInPlay = "";
    lettersGuessed = [];
    hitCount = 0;
    guessesRemaining = 15;
    currWord.innerHTML = "";
    spentLetters.innerHTML = "";
}

//Begin game and display letters in a hidden form
document.addEventListener("keypress", function(e) {
    
    if (gameState === false && e.key === " ") {
        wordInPlay = words[Math.floor(Math.random()*words.length)].toUpperCase();
        displayWord(wordInPlay);
        gameState = true;
        guessesRemaining = 15;
        document.getElementById("guesses_left").textContent = guessesRemaining;

    } else if (gameState === true && /[a-zA-Z]+/.test(e.key) && guessesRemaining > 0) {
        if (lettersGuessed.includes(e.key.toUpperCase()) == false) {
            lettersGuessed.push(e.key.toUpperCase())
            showGuessedLetter();
            guessesRemaining--;
            document.getElementById("guesses_left").textContent = guessesRemaining;
            for (let i = 0; i < wordInPlay.length; i++) {    
                if (wordInPlay[i] === e.key.toUpperCase()) {
                    document.getElementById("letter_" + i).style.opacity = ".7";
                    hitCount++;
                }
            }  
        }

    } else if (guessesRemaining === 0 || hitCount === wordInPlay.length ) {
        if (gameState === true) {
            clearGame();
        }
    }
})
