

(function initListeners() {
    document.getElementById("settings").addEventListener('click', openSettings);
    document.getElementById("reminders").addEventListener('click', openReminders);
    document.getElementById("return").addEventListener('click', reset);

})();

function reset(event) {
    event.target.hidden = true;
    document.getElementById("page-notes").hidden = true;
    document.getElementById("home-grid").style.display = "flex";
    document.getElementById("return").hidden = true;
}

function openSettings() {

}


function openReminders() {
    document.getElementById("return").hidden = false;
    document.getElementById("page-notes").hidden = false;
    document.getElementById("home-grid").style.display = "none";
}