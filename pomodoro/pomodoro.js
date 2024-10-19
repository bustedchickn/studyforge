// Globals
const timer = document.querySelector(".timer");
let maxTime = 900;
let timeLeft = 900;
let timerInterval;
const timeDisplay = document.querySelector('.time-display');

const startTimer = (event) => resumeTimer(event, startTimer);
document.getElementById('timer-control').addEventListener('click', startTimer);

// --------------- Timer Control ---------------

function pauseTimer(event) {
    clearInterval(timerInterval);
    event.target.innerText = "Resume";
    event.target.removeEventListener('click', pauseTimer);
    event.target.addEventListener('click', resumeTimer);
}

function resumeTimer(event, startFunction = resumeTimer) {
    timerInterval = setInterval(updateTimer, 1);
    event.target.innerText = "Pause";
    event.target.removeEventListener('click', startFunction);
    event.target.addEventListener('click', pauseTimer);
}

function updateTimer() {
    if (timeLeft === 0) {
        clearInterval(timerInterval);
        resetTimer(maxTime === 900 ? 300 : 900)
        return;
    }
    timeLeft -= 1;

    const seconds = timeLeft % 60;
    const split = 360 - (timeLeft / maxTime * 360);
    timeDisplay.innerText = `${Math.floor(timeLeft / 60)}:${seconds.toString().padStart(2, '0')}`;
    timer.style.background = `conic-gradient(white 0deg, white ${split}deg, blue, ${split}deg, blue 360deg)`;
}

function resetTimer(newMaxTime) {
    const button = document.getElementById("timer-control");
    
    maxTime = newMaxTime;
    timeLeft = newMaxTime;

    button.innerText = "start";
    button.removeEventListener('click', resumeTimer);
    button.addEventListener('click', startTimer);

    timer.style.background = "conic-gradient(blue, blue)";
    timeDisplay.innerText = maxTime / 60 + ":00";
    const sound = document.getElementById("alert-sound");
    sound.play();
    setTimeout(() => sound.play(), 1750);
}