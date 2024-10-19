let isPlaying = false;
document.getElementById('brown noise').pause();

(function initListeners() {
    document.getElementById("settings").addEventListener('click', openSettings);
    document.getElementById("reminders").addEventListener('click', openReminders);
    document.getElementById("return").addEventListener('click', reset);
    document.getElementById("pomo-button").addEventListener('click', openPomodoro);
    document.getElementById('sound-player').addEventListener('click', startSound);

})();

function startSound() {
    const sound = document.getElementById('brown noise');
    if (isPlaying) {
        sound.pause();
    } else {
        sound.currentTime = 0;
        sound.play();
    }
    isPlaying = !isPlaying;
}   

function reset(event) {
    event.target.hidden = true;
    document.getElementById("page-notes").hidden = true;
    document.getElementById("home-grid").style.display = "flex";
    document.getElementById("return").hidden = true;
    document.body.style.height = '475px';
}

function openSettings() {

}

function openReminders() {
    document.getElementById("return").hidden = false;
    document.getElementById("page-notes").hidden = false;
    document.getElementById("home-grid").style.display = "none";
    document.body.style.height = '300px';
}

function openPomodoro() {
    window.open('../pomodoro/pomodoro.html', 'Pomodoro Timer', 'width=200,height=250');
}

function openMusic(){
    //get the preference


    //if theres no preference, play the brown noise
}