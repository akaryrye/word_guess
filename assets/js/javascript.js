
// global variables
let words = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];
let guessesRemaining = 15;
let lettersGuessed = [];
let gameState = false;
let wordInPlay = '';
let hitCount = 0;
const sound = new Audio();

// element variables
let currWord = document.getElementById("current_word");
let spentLetters = document.getElementById("spent_letters");
let count = document.getElementById("sound_clip");
//let count = url("assets\media\Count.mp3");

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

// Display letters that have been guessed already
function showGuessedLetter () {
    let spentLetter = document.createElement("div");
    spentLetter.classList.add("letter_spent");
    spentLetter.textContent = lettersGuessed[lettersGuessed.length - 1];
    spentLetters.appendChild(spentLetter);
}

// Reset the game to prepare for another round
function clearGame () {
    gameState = false;
    //wordInPlay = "";
    lettersGuessed = [];
    hitCount = 0;
    guessesRemaining = 15;
    spentLetters.innerHTML = "";
    document.getElementById("guesses_left").textContent = guessesRemaining;
}

function results() {
    let newDiv = document.createElement('div');
    if (hitCount === wordInPlay.length) {
        newDiv.textContent = "You Won!!!";
        count.play();
    } else {
        newDiv.textContent = "Better Luck Next Time ...";
    }
    document.getElementById("result").appendChild(newDiv);
}

count.play();

// Dynamically display possibilities on sidebar
window.onload = function list() {
    let sideList = document.getElementById("sidebar");
    for (let i = 0; i < words.length; i++) {
        let sideElement = document.createElement("div");
        sideElement.classList.add("side_list");
        sideElement.textContent = words[i];
        sideList.appendChild(sideElement);
    }
}

// Begin game and display letters in a hidden form
document.addEventListener("keypress", function(e) {
    
    if (gameState === false && e.key === " ") {
        document.getElementById("result").innerHTML = "";
        currWord.innerHTML = "";
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

        } if (guessesRemaining === 0 || hitCount === wordInPlay.length) {
            results();
            clearGame();
        }
    } 
});
