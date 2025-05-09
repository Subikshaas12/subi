document.addEventListener("DOMContentLoaded", () => {
    let score = 0;
    let timeLeft = 60;
    let timer;
    let currentWord = "";
    let hiddenWord = "";
    let currentTheme = "";

    let wordsDatabase = [
        { theme: "City", words: ["Paris", "Berlin", "Tokyo", "Madrid", "London", "Rome"] },
        { theme: "Fruit", words: ["Apple", "Banana", "Mango", "Grapes", "Cherry", "Strawberry"] },
        { theme: "French food", words: ["Baguette", "Croissant", "Brie", "Ratatouille", "Macaron"] }
    ];

    let hintsDatabase = {
        "City": ["Capital of France", "German capital", "Japanese capital", "Spanish capital", "British capital", "Italian city"],
        "Fruit": ["Keeps the doctor away", "Long and yellow", "Tropical fruit", "Used for wine", "Red and sweet", "A berry but not really"],
        "French food": ["Long bread", "Flaky pastry", "A type of cheese", "Classic French dish", "Small round dessert"]
    };

    // DOM Elements
    const wordDisplay = document.getElementById("word_display");
    const themeDisplay = document.getElementById("theme_display");
    const hintButton = document.getElementById("hint_button");
    const hintDisplay = document.getElementById("hint_display");
    const scoreDisplay = document.getElementById("score");
    const timerDisplay = document.getElementById("timer");
    const toggleThemeButton = document.getElementById("toggle_theme");
    const addWordButton = document.getElementById("add_word");
    const leaderboardDisplay = document.getElementById("leaderboard");
    const guessInput = document.getElementById("guess_input");
    const guessButton = document.getElementById("guess_button");

    const newGameButton = document.createElement("button");
    newGameButton.textContent = "New Game";
    newGameButton.id = "new_game";
    document.body.appendChild(newGameButton);

    function startTimer() {
        timeLeft = 60;
        timerDisplay.textContent = timeLeft;
        clearInterval(timer);
        timer = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer);
                alert("Time's up! Game Over!");
                updateScore(false);
                startNewGame();
            }
        }, 1000);
    }

    function chooseWord() {
        let randomTheme = wordsDatabase[Math.floor(Math.random() * wordsDatabase.length)];
        currentTheme = randomTheme.theme;
        currentWord = randomTheme.words[Math.floor(Math.random() * randomTheme.words.length)].toUpperCase();
        hiddenWord = "_ ".repeat(currentWord.length);
        themeDisplay.textContent = `Theme: ${currentTheme}`;
        wordDisplay.textContent = hiddenWord;
        hintDisplay.textContent = "";
    }

    function checkGuess() {
        let userGuess = guessInput.value.trim().toUpperCase();
        if (!userGuess) return;
        if (userGuess === currentWord) {
            alert("🎉 Correct! You guessed the word!");
            updateScore(true);
            startNewGame();
        } else {
            alert("❌ Wrong! Try again.");
            updateScore(false);
        }
        guessInput.value = "";
    }

    function updateScore(isWin) {
        score += isWin ? 10 : -5;
        scoreDisplay.textContent = score;
        saveLeaderboard();
    }

    function saveLeaderboard() {
        let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
        leaderboard.push(score);
        leaderboard.sort((a, b) => b - a);
        leaderboard = leaderboard.slice(0, 5);
        localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
        displayLeaderboard();
    }

    function displayLeaderboard() {
        let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
        leaderboardDisplay.innerHTML = leaderboard.map(score => `<li>${score} points</li>`).join("");
    }

    function startNewGame() {
        chooseWord();
        startTimer();
    }

    function toggleTheme() {
        document.body.classList.toggle("dark-mode");
        document.body.classList.toggle("light-mode");
    }

    function addCustomWord() {
        let newTheme = prompt("Enter theme (e.g., City, Fruit, etc.):");
        let newWord = prompt("Enter a word for this theme:");
        if (!newTheme || !newWord) {
            alert("Theme and word cannot be empty!");
            return;
        }
        let found = wordsDatabase.find(theme => theme.theme.toLowerCase() === newTheme.toLowerCase());
        if (found) {
            found.words.push(newWord);
        } else {
            wordsDatabase.push({ theme: newTheme, words: [newWord] });
            hintsDatabase[newTheme] = ["Custom hint not available"];
        }
        alert(`Word '${newWord}' added under theme '${newTheme}'!`);
    }

    function showHint() {
        let themeHints = hintsDatabase[currentTheme] || [];
        let wordIndex = wordsDatabase.find(theme => theme.theme === currentTheme)
            .words.indexOf(currentWord.toLowerCase());
        hintDisplay.textContent = themeHints[wordIndex] || "No hint available";
    }

    hintButton.addEventListener("click", showHint);
    toggleThemeButton.addEventListener("click", toggleTheme);
    addWordButton.addEventListener("click", addCustomWord);
    newGameButton.addEventListener("click", startNewGame);
    guessButton.addEventListener("click", checkGuess);
    guessInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            checkGuess();
        }
    });

    displayLeaderboard();
    startNewGame();
});
