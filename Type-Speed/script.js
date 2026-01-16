const startBtn = document.getElementById("startBtn");
const playAgainBtn = document.getElementById("playAgainBtn");
const lengthInput = document.getElementById("lengthInput");
const wordDisplay = document.getElementById("wordDisplay");
const userInput = document.getElementById("userInput");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const bestScoreEl = document.getElementById("bestScore");
const gameContainer = document.getElementById("game-container");

let words = [];
let filtered = [];
let timer = 30;
let score = 0;
let interval = null;
let best = localStorage.getItem("bestScore") || 0;
bestScoreEl.textContent = best;

// Load words from JSON
fetch("words.json")
 .then(res => res.json())
 .then(data => {
    console.log("Loaded words:", data.length);
    words = data;
 });


function startGame() {
    let length = parseInt(lengthInput.value);
    filtered = words.filter(w => w.length === length);

    if (filtered.length === 0) {
        alert("No English words of this length!");
        return;
    }

    gameContainer.classList.remove("hidden");
    score = 0;
    timer = 30;
    scoreEl.textContent = score;
    timerEl.textContent = timer;
    userInput.value = "";
    userInput.disabled = false;
    userInput.focus();

    nextWord();

    interval = setInterval(() => {
        timer--;
        timerEl.textContent = timer;
        if (timer <= 0) endGame();
    }, 1000);
}

function nextWord() {
    wordDisplay.textContent = filtered[Math.floor(Math.random() * filtered.length)];
}

function endGame() {
    clearInterval(interval);
    userInput.disabled = true;
    if (score > best) {
        best = score;
        localStorage.setItem("bestScore", best);
        bestScoreEl.textContent = best;
    }
}

userInput.addEventListener("input", () => {
    if (userInput.value === wordDisplay.textContent) {
        score++;
        scoreEl.textContent = score;
        userInput.value = "";
        nextWord();
    }
});

startBtn.addEventListener("click", startGame);
playAgainBtn.addEventListener("click", startGame);