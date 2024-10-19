// Create the main button
const settingButton = document.createElement('button');
settingButton.classList.add('settingButton');
settingButton.innerHTML = '. . .';
document.body.appendChild(settingButton);

// Create the container for the settings (ul)
const setting = document.createElement('ul');
setting.classList.add('generalSetting');
document.body.appendChild(setting);

// Add the 'Music' section
const music = document.createElement('li');
music.id = 'music';
music.classList.add('j_hide');
music.innerHTML = '<input type="checkbox" id="Music"> <label for="Music">Music</label>';
setting.appendChild(music);

// Create nested 'musicHolder' div and the music services list
const musicHolder = document.createElement('div');
musicHolder.classList.add('musicHolder', 'j_hide');
musicHolder.id = 'musicHolder';
const musicList = document.createElement('ul');

//This is going ot display all the music options.
const musicBox = document.getElementById('Music');
musicBox.addEventListener('click', () => {
    if (musicHolder.classList.contains('j_hide')) {
        musicHolder.classList.remove('j_hide');
    } else {
        musicHolder.classList.add('j_hide');
    }
})

// List of things ot listen to music to.
const spotify = document.createElement('li');
spotify.innerHTML = '<input type="checkbox" id="Spotify"> <label for="Spotify">Spotify</label>';
musicList.appendChild(spotify);

const pandora = document.createElement('li');
pandora.innerHTML = '<input type="checkbox" id="Pandora"> <label for="Pandora">Pandora</label>';
musicList.appendChild(pandora);

const youtubeMusic = document.createElement('li');
youtubeMusic.innerHTML = '<input type="checkbox" id="YoutubeMusic"> <label for="YoutubeMusic">YouTube Music</label>';
musicList.appendChild(youtubeMusic);

const brownNoise = document.createElement('li');
youtubeMusic.innerHTML = '<input type="checkbox" id="noise"> <label for="brownNoise">Brown Noise</label>';
musicList.appendChild(brownNoise);

// Append the music list to the music holder, then to the general setting list
musicHolder.appendChild(musicList);
setting.appendChild(musicHolder);

// Add 'Focus Mode' section
const focusMode = document.createElement('li');
focusMode.id = 'focusMode';
focusMode.classList.add('focusMode', 'j_hide');
focusMode.innerHTML = '<input type="checkbox" id="focus"> <label for="focus">Focus Mode</label>';
setting.appendChild(focusMode);

const focusBox = document.getElementById('focus');
focusBox.addEventListener('click', () => {
    if (focusUrlHolder.classList.contains('j_hide')) {
        focusUrlHolder.classList.remove('j_hide');
    } else {
        focusUrlHolder.classList.add('j_hide');
    }
})

// Create nested 'FocusUrlHolder' div and its content
const focusUrlHolder = document.createElement('div');
focusUrlHolder.classList.add('FocusUrlHolder', 'j_hide');
focusUrlHolder.id = 'FocusUrlHolder';

const focusList = document.createElement('ul');

// Add items to the focus list
const facebook = document.createElement('li');
facebook.innerHTML = '<input type="checkbox" id="Facebook"> <label for="Facebook">Facebook</label>';
focusList.appendChild(facebook);

const youtube = document.createElement('li');
youtube.innerHTML = '<input type="checkbox" id="Youtube"> <label for="Youtube">YouTube</label>';
focusList.appendChild(youtube);

const discord = document.createElement('li');
discord.innerHTML = '<input type="checkbox" id="Discord"> <label for="Discord">Discord</label>';
focusList.appendChild(discord);

const x = document.createElement('li');
x.innerHTML = '<input type="checkbox" id="X"> <label for="X">X</label>';
focusList.appendChild(x);

const other = document.createElement('li');
other.innerHTML = '<input type="checkbox" id="Other"> <label for="Other">Other</label>';
focusList.appendChild(other);

// Add text input for 'Other' URLs
const otherUrlInput = document.createElement('input');
otherUrlInput.type = 'text';
otherUrlInput.id = 'OtherUrl';
otherUrlInput.classList.add('OtherUrl');
focusList.appendChild(otherUrlInput);

// Append focus list to the focus URL holder, then to the general setting list
focusUrlHolder.appendChild(focusList);
setting.appendChild(focusUrlHolder);

// Add the 'Pomodoro' section
const pomodoro = document.createElement('li');
pomodoro.id = 'pomodoro';
pomodoro.classList.add('j_hide');
pomodoro.innerHTML = '<input type="checkbox" id="pomodoro"> <label for="pomodoro">Pomodoro</label>';
setting.appendChild(pomodoro);

// Add the 'Assignment Selector' section
const assignmentSelector = document.createElement('li');
assignmentSelector.id = 'assignmentSelector';
assignmentSelector.classList.add('j_hide');
assignmentSelector.innerHTML = '<input type="checkbox" id="assignmentSelector"> <label for="assignmentSelector">Assignment Selector</label>';
setting.appendChild(assignmentSelector);

// Add the 'Website' section
const website = document.createElement('li');
website.id = 'website';
website.classList.add('j_hide');
website.innerHTML = '<input type="checkbox" id="HomePage"> <label for="HomePage">Website</label>';
setting.appendChild(website);

let setButton = false;

settingButton.addEventListener('click', () => {
    if (setButton == false) {
        setButton = true;
        music.classList.remove('j_hide');
        focusMode.classList.remove('j_hide');
        pomodoro.classList.remove('j_hide');
        assignmentSelector.classList.remove('j_hide');
        website.classList.remove('j_hide');
    } else {
        setButton = false;
        music.classList.add('j_hide');
        focusMode.classList.add('j_hide');
        pomodoro.classList.add('j_hide');
        assignmentSelector.classList.add('j_hide');
        website.classList.add('j_hide');
    }
});




