// Globals
const timer = document.querySelector(".timer");
let maxTime = 900;
let timeLeft = 0;
let timerInterval;
const timeDisplay = document.querySelector('.time-display');

(function initListeners() {
    document.getElementById('timer-control').addEventListener('click', startTimer);
})();


// --------------- Timer Control ---------------

function startTimer(event) {
    timeLeft = 900; // Seconds (15 min)    
    resumeTimer(event, startTimer)
}

function pauseTimer(event) {
    clearInterval(timerInterval);
    event.target.innerText = "Resume";
    event.target.removeEventListener('click', pauseTimer);
    event.target.addEventListener('click', resumeTimer);
}

function resumeTimer(event, startFunction = resumeTimer) {
    timerInterval = setInterval(updateTimer, 100);
    event.target.innerText = "Pause";
    event.target.removeEventListener('click', startFunction);
    event.target.addEventListener('click', pauseTimer);
}

function updateTimer() {
    if (timeLeft === 0) {
        clearInterval(timerInterval);
        return;
    }
    timeLeft -= 1;

    const seconds = timeLeft % 60;
    const split = 360 - (timeLeft / maxTime * 360);
    timeDisplay.innerText = `${Math.floor(timeLeft / 60)}:${seconds.toString().padStart(2, '0')}`;
    timer.style.background = `conic-gradient(white 0deg, white ${split}deg, blue, ${split}deg, blue 360deg)`
}
