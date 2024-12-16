// Selecting necessary DOM elements
const hoursInput = document.getElementById("hours");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");
const timeDisplay = document.getElementById("timeDisplay");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const alarmSound = document.getElementById("alarmSound");

let countdown;
let totalTimeInSeconds;
let isPaused = false;

// Start Button Functionality
startBtn.addEventListener("click", () => {
    if (!countdown) {
        totalTimeInSeconds = calculateTotalTimeInSeconds();
        if (totalTimeInSeconds > 0) {
            countdown = setInterval(updateTimer, 1000);
        }
    }
});

// Pause Button Functionality
pauseBtn.addEventListener("click", () => {
    if (countdown) {
        clearInterval(countdown);
        countdown = null;
        isPaused = true;
    }
});

// Reset Button Functionality
resetBtn.addEventListener("click", () => {
    clearInterval(countdown);
    countdown = null;
    isPaused = false;
    hoursInput.value = 0;
    minutesInput.value = 0;
    secondsInput.value = 0;
    timeDisplay.textContent = "00:00:00";
    alarmSound.pause();
    alarmSound.currentTime = 0; // Reset sound
});

// Function to update the timer display
function updateTimer() {
    if (totalTimeInSeconds > 0) {
        totalTimeInSeconds--;
        const displayTime = formatTime(totalTimeInSeconds);
        timeDisplay.textContent = displayTime;
    } else {
        clearInterval(countdown);
        countdown = null;
        alarmSound.play(); // Play sound when timer finishes
        alert("Time's up!");
    }
}

// Calculate the total time in seconds from inputs
function calculateTotalTimeInSeconds() {
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;
    return (hours * 3600) + (minutes * 60) + seconds;
}

// Format time as HH:MM:SS
function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
}

// Add leading zero to numbers < 10
function pad(num) {
    return num < 10 ? "0" + num : num;
}
