let isPlaying = false;
document.getElementById('brown noise').pause();
let sound = document.getElementById('brown noise');

(function initListeners() {
    document.getElementById("settings").addEventListener('click', openSettings);
    document.getElementById("reminders").addEventListener('click', openReminders);
    document.getElementById("return").addEventListener('click', reset);
    document.getElementById("pomo-button").addEventListener('click', openPomodoro);
    document.getElementById('sound-player').addEventListener('click', startSound);

})();

function startSound() {
    if (sound == document.getElementById('brown noise')) {
        const soundpic = document.getElementById('meSound');
        if (isPlaying) {
            sound.pause();
            soundpic.classList.remove("playing");
        } else {
            sound.currentTime = 0;
            sound.play();
            soundpic.classList.add("playing");
        }
        isPlaying = !isPlaying;
    }
    else{
        window.open("https://"+sound+".com", "_blank");
    }
}   

function reset(event) {
    event.target.hidden = true;
    document.getElementById("page-notes").hidden = true;
    document.getElementById("home-grid").style.display = "flex";
    document.getElementById("return").hidden = true;
    document.body.style.height = '475px';
}

function openSettings() {
    return;
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

function loadStoredCheckboxData() {
    chrome.storage.local.get(["selectedOptions"], function (result) {
        const savedValues = result.selectedOptions || [];
        console.log("Retrieved selected options:", savedValues);

        // Here you can use `savedValues` for any purpose you need in this file
        // For example, you might log each saved checkbox ID or perform an action based on each ID
        savedValues.forEach(id => {
            console.log("Checkbox ID loaded:", id);
            // Perform actions based on the loaded checkbox ID
            // For example:
            
            
            if (id === 'Spotify') { 
                sound = "open.spotify";
            }
            else if (id === 'Pandora') { 
                sound = "www.pandora";
            }
            else if (id === 'YoutubeMusic'){
                sound = "music.youtube";
            }
            else if (id === 'noise'){
                sound = document.getElementById('brown noise');
            }
            
        });

    });
    
}
window.onload = function(){
    loadStoredCheckboxData();
}