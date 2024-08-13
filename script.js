// Generate a random number between 1 and 100
const correctAnswer = Math.floor(Math.random() * 100) + 1;
let attempts = 10;

// Function to create number buttons
function createNumberButtons() {
    const numberBox = document.getElementById('numberBox');
    for (let i = 1; i <= 100; i++) {
        const button = document.createElement('div');
        button.className = 'numberButton';
        button.innerText = i;
        button.addEventListener('click', () => handleGuess(i));
        numberBox.appendChild(button);
    }
}

// Handle guess
function handleGuess(userGuess) {
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        alert("Please select a number between 1 and 100.");
        return;
    }

    attempts--;

    if (userGuess === correctAnswer) {
        alert("Congratulations! You guessed the correct number!");
        document.getElementById("feedbackBox").innerText = "You won!";
        document.getElementById("image").style.filter = "blur(0px)";
        disableAllButtons();
    } else if (userGuess > correctAnswer) {
        alert("Too high! Try again.");
        document.getElementById("feedbackBox").innerText = `Try a lower number. Attempts left: ${attempts}`;
        document.getElementById("feedbackBox").style.backgroundColor = "#ffcccc"; // Red color for too high
    } else {
        alert("Too low! Try again.");
        document.getElementById("feedbackBox").innerText = `Try a higher number. Attempts left: ${attempts}`;
        document.getElementById("feedbackBox").style.backgroundColor = "#ccccff"; // Blue color for too low
    }

    // Update the image blur based on remaining attempts
    const blurAmount = 10 - (5 - attempts) * 2;
    document.getElementById("image").style.filter = `blur(${blurAmount}px)`;

    if (attempts === 0) {
        alert(`Sorry, you've run out of attempts. The correct number was ${correctAnswer}.`);
        document.getElementById("feedbackBox").innerText = `Game Over! The correct number was ${correctAnswer}.`;
        document.getElementById("image").style.filter = "blur(0px)"; // Clear the image
        disableAllButtons();
    }
}

// Disable all number buttons
function disableAllButtons() {
    const buttons = document.querySelectorAll('.numberButton');
    buttons.forEach(button => button.removeEventListener('click', handleGuess));
}

// Initialize the game
createNumberButtons();