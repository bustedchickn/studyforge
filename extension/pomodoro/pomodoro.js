// Globals
const timer = document.querySelector(".timer");
let maxTime = 900;
let timeLeft = 900;

let timerInterval;
const timeDisplay = document.querySelector('.time-display');

const startTimer = (event) => resumeTimer(event, startTimer);
document.getElementById('timer-control').addEventListener('click', startTimer);

(function initTimer() {
    timer.style.animation = 'reset 1s linear forwards';
    timer.addEventListener('animationend', () => {
        timer.style.animation = '';
        timer.style.background = '';
    });

    const urlParams = new URLSearchParams(window.location.search);
    const newMaxTime = urlParams.get('time');
    if (newMaxTime) {
        maxTime = Number(newMaxTime);
        timeLeft = Number(newMaxTime);
        timeDisplay.innerText = maxTime / 60 + ":00";
    } else {
        timer.style.animation = 'reset 1s linear forwards';
    }
})();


// --------------- Timer Control ---------------

function pauseTimer(event) {
    clearInterval(timerInterval);
    event.target.innerText = "Resume";
    event.target.removeEventListener('click', pauseTimer);
    event.target.addEventListener('click', resumeTimer);
}

function resumeTimer(event, startFunction = resumeTimer) {
    timerInterval = setInterval(updateTimer, 1000);
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
    button.removeEventListener('click', pauseTimer);
    button.addEventListener('click', startTimer);

    alarm(newMaxTime);
    if (!document.hasFocus()) {
        refocusPage(newMaxTime);
        return;
    }
}

function refocusPage(newMaxTime) {
    const newWindow = window.open(`pomodoro.html?time=${newMaxTime}`, `pomodoro-${Date.now()}`, 'width=200,height=200');
    if (newWindow) setTimeout(() => window.close(), 1000);
}

function alarm(maxTime) {
    timeDisplay.innerText = maxTime / 60 + ":00";
    const sound = document.getElementById("alert-sound");
    sound.play();
    timer.style.animation = 'reset 1s linear forwards';
}