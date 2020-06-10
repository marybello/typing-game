const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

//list of words

const words = [
    "sigh",
    "tense",
    "airplane",
    "ball",
    "pies",
    "juice",
    "warlike",
    "bad",
    "north",
    "dependent",
    "steer",
    "silver",
    "highfalutin",
    "superficial",
    "quince",
    "eight",
    "feeble",
    "admit",
    "drag",
    "loving",
    "nigeria",
    "economics",
    "coronavirus",
    "market",
    "ignite",
    "biochemistry",
    "meal",
    "strategy",
    "collision",
    "magnify",
    "template",
    "solution",
    "control",
    "noble",
    "professional",
    "management",
    "country",
    "timeline",
    "eloquent",
    "explorer",
    "collaboration",
    "team",
    "global",
];

// focus on input text on start of game
text.focus();
//init random word
let randomWord;

let score = 0;
let time = 10;
const timeInterval = setInterval(updateTime, 1000);
let difficulty =
    localStorage.getItem("difficulty") !== null ?
    localStorage.getItem("difficulty") :
    "medium";

difficultySelect.value =
    localStorage.getItem("difficulty") !== null ?
    localStorage.getItem("difficulty") :
    "medium";

//generate randome word
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function addtoDOM() {
    randomWord = getRandomWord();
    word.innerText = randomWord;
}

function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}

function updateTime() {
    time--;
    timeEl.innerHTML = time + "s";

    if (time == 0) {
        clearInterval(timeInterval);
        gameOver();
    }
}

function gameOver() {
    endgameEl.innerHTML = `<h1>Time ran out</h1>
<p>Your final score is ${score}</p>
<button onclick="location.reload()">Reload</button>`;

    endgameEl.style.display = "flex";
}

addtoDOM();

text.addEventListener("input", (e) => {
    const insertedText = e.target.value;
    if (insertedText === randomWord) {
        addtoDOM();
        updateScore();

        e.target.value = "";
        if (difficulty == "hard") {
            time += 2;
        } else if (difficulty == "medium") {
            time += 3;
        } else {
            time += 4;
        }
        updateTime();
    }
});
settingsBtn.addEventListener("click", () => {
    settings.classList.toggle("hide");
});

difficultySelect.addEventListener("change", (e) => {
    difficulty = e.target.value;
    localStorage.setItem("difficulty", difficulty);
    location.reload();
});