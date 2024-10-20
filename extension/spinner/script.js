let tasks = [];
let completedTasks = []; // Array to hold completed tasks
let isPicking = false;
let soundToggle = 1;

let taskInput = document.getElementById("taskInput");
taskInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {  // Check if the "Enter" key is pressed
        addTask();  // Call the same function as the button click
    }});

var bodyElement = document.querySelector('body');
const randombg = getRandomColor();
const randbuttonbg = getRandomColor();
bodyElement.style.background = randombg;


setButtonContrastColors(randbuttonbg);
setHeaderContrastColors(randombg);


function addTask() {
    if (isPicking) return;
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    const task = taskInput.value.trim();
    if (task !== "") {
        tasks.push(task);

        // Update the task list display
        const li = document.createElement("li");
        li.textContent = task;
        li.onclick = () => highlightTask(li); // Add click event to highlight task
        taskList.appendChild(li);

        // Save list to local storage as json
        saveList1ToLocalStorage();

        // Clear the input
        taskInput.value = "";
        taskInput.focus();
    }
}

function pickTask() {
    if (tasks.length === 0) {
        alert("Please add some tasks first!");
        return;
    }

    isPicking = true;

    const taskListItems = document.querySelectorAll("#taskList li");
    let currentIndex = 0; // Start at a random index
    let delay = 100;  // Start with a short delay
    const totalCycles = 30 + Math.floor(Math.random() * 10); // Random number of cycles to create unpredictability
    let cycleCount = 0; // Track the number of cycles completed

    // Get the audio element
    if (soundToggle == 1){
        soundType = "taskSound";
        delay = 100;
    } else if(soundToggle == 2) {
        soundType = "piano";
        delay = 400;
    } else {
        soundType = "scale";
        delay = 100;
    }
    let taskSound = document.getElementById(soundType+"1");
    let newnum = 1;

    function highlightNextItem() {
        // Remove highlight from all items
        taskListItems.forEach(item => item.classList.remove("highlight"));
        taskListItems.forEach(item => item.style.backgroundColor = "#FFFFFF");
        taskListItems.forEach(item => item.style.color = "black");
        
        
        // Highlight the current item with a random color
        randomColor = getRandomColor();
        taskListItems[currentIndex].style.backgroundColor = randomColor;
        taskListItems[currentIndex].style.color = getListContrastColor(randomColor);
        taskListItems[currentIndex].classList.add("highlight");

        // Play sound each time a new item is highlighted
        taskSound.currentTime = 0; // Reset to the beginning
        taskSound.play(); // Play the sound
        newnum = Math.floor(Math.random() * 2 + 3);
        // if (soundToggle == 1){
        //     newnummax = 6;
        
        // }else{
        //     newnummax = 7;
        // }
        // if (newnum > newnummax){
        //     newnum = 1;
        // }
        taskSound = document.getElementById(soundType + newnum);
        // Move to the next item, looping back to the start if necessary
        currentIndex = (currentIndex + 1) % tasks.length;

        // Increase delay gradually to slow down the highlight cycling
        delay += 10;

        // Continue the cycle until we've done enough total cycles
        if (cycleCount < totalCycles&&isPicking) {
            setTimeout(highlightNextItem, delay);
            cycleCount++; // Increment the cycle count
        } else {
            // Stop cycling and pick the current task
            const selectedTask = taskListItems[(currentIndex - 1 + tasks.length) % tasks.length].textContent;

            const resultDiv = document.getElementById("result");
            resultDiv.textContent = `Your task: ${selectedTask}`;
            isPicking = false;  // Allow further selections
        }
    }
    
    highlightNextItem();  // Start the task highlighting cycle
}

function highlightTask(taskItem) {
    if (isPicking) isPicking = false;
    
    // Remove highlight from all items
    const taskListItems = document.querySelectorAll("#taskList li");
    taskListItems.forEach(item => item.classList.remove("highlight"));
    taskListItems.forEach(item => item.style.backgroundColor = "#FFFFFF");
    taskListItems.forEach(item => item.style.color = "black");

    // Highlight the current item with a random color
    randomColor = getRandomColor();
    taskItem.style.backgroundColor = randomColor;
    taskItem.style.color = getListContrastColor(randomColor);
    taskItem.classList.add("highlight");

    // Display the selected task in the result section
    const resultDiv = document.getElementById("result");
    resultDiv.textContent = `Your task: ${taskItem.textContent}`;
}

function completeTask() {
    if (isPicking) isPicking = false;


    const resultDiv = document.getElementById("result");
    const selectedTaskText = resultDiv.textContent.replace("Your task: ", ""); // Get the selected task

    if (!selectedTaskText || selectedTaskText === "Your task: ") {
        alert("Please select a task first!");
        return;
    }
    // Update counter
    if (selectedTaskText != "Your task: ") incrementCounter();
    
    // Find the index of the selected task in the task list
    const taskIndex = tasks.indexOf(selectedTaskText);
    if (taskIndex > -1) {
        // Remove the task from the tasks array
        tasks.splice(taskIndex, 1);

        // Add the task to the completed tasks array
        completedTasks.push(selectedTaskText);

        // Update the displayed task list
        updateTaskList();

        // Show completed tasks if not already visible
        const completedTasksSection = document.getElementById("completedTasksSection");
        completedTasksSection.style.display = "block";
        updateCompletedTasksList();
    } else {
        alert("Task not found!");
    }
}

function updateTaskList() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Clear current task list
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task;
        li.onclick = () => highlightTask(li); // Re-add click event for new list items
        taskList.appendChild(li);
    });

    // Save list to local storage as json
    saveList1ToLocalStorage();
}

function updateCompletedTasksList() {
    const completedTasksList = document.getElementById("completedTasksList");
    completedTasksList.innerHTML = ""; // Clear current completed tasks list
    completedTasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task;
        completedTasksList.appendChild(li);
    });
}

function toggleCompletedTasks() {
    const completedTasksSection = document.getElementById("completedTasksSection");
    butt = document.getElementById("completed-toggle");
    if (completedTasksSection.style.display === "none") {
        completedTasksSection.style.display = "block";
        butt.innerText = "Hide Completed Tasks";
    } else {
        completedTasksSection.style.display = "none";
        butt.innerText = "Show Completed Tasks";
    }
}


function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


// // Save List 1 to chrome.storage.local
// function saveList1ToChromeStorage() {
//     var listItems = document.querySelectorAll('#taskList li');
//     var itemsArray = [];

//     // Loop through list items and save their text content
//     listItems.forEach(function(li) {
//         itemsArray.push(li.textContent);
//     });

//     // Save the array to chrome.storage.local
//     chrome.storage.local.set({ 'myList1': itemsArray }, function() {
//         console.log('List 1 saved to chrome.storage');
//     });
// }

// // Load List 1 from chrome.storage.local when the page is loaded
// function loadList1FromChromeStorage() {
//     chrome.storage.local.get('myList1', function(result) {
//         var storedList = result.myList1;

//         if (storedList) {
//             // Loop through the stored array and recreate the list items
//             storedList.forEach(function(item) {
//                 var li = document.createElement('li');
//                 li.textContent = item;
//                 document.getElementById('list1').appendChild(li);
//             });
//         }
//     });
// }

// Save List 1 to localStorage
function saveList1ToLocalStorage() {
    var listItems = document.querySelectorAll('#taskList li');
    var itemsArray = [];

    // Loop through list items and save their text content
    listItems.forEach(function(li) {
        itemsArray.push(li.textContent);
    });

    // Save the array to localStorage as a JSON string
    localStorage.setItem('myList1', JSON.stringify(itemsArray));
    console.log(localStorage.getItem('myList1'));
}

// Load List 1 from localStorage when the page is loaded
function loadList1FromLocalStorage() {
    var storedList = localStorage.getItem('myList1'); // Get the list from localStorage

    if (storedList) {
        var itemsArray = JSON.parse(storedList); // Parse the JSON string back into an array

        // Loop through the array and recreate the list items
        itemsArray.forEach(function(item) {
            var li = document.createElement('li');
            li.textContent = item;
            document.getElementById('list1').appendChild(li);
        });
    }
}


// Load List 1 from chrome.storage when the page is loaded
window.onload = loadList1FromLocalStorage;


window.addEventListener('unload', function () {
    // Run a function when the page is being unloaded
    console.log("Page is unloading, user has left.");
    // Here you can do something like saving data, sending analytics, etc.
    saveList1ToLocalStorage();
});

function getContrastColor() {
    // Get the body's background color
    const bodyElement = document.body;
    const bgColor = window.getComputedStyle(bodyElement).backgroundColor;

    // Convert RGB color to brightness
    rgbValues = bgColor.match(/\d+/g);
    r = parseInt(rgbValues[0]);
    g = parseInt(rgbValues[1]);
    b = parseInt(rgbValues[2]);

    // Calculate perceived brightness
    brightness = (r * 299 + g * 587 + b * 114) / 1000;

    // Determine whether to return white or black text
    return (brightness > 128) ? 'black' : 'white';
}

function getListContrastColor(bagColor) {
    const rgb = hexToRgb(bagColor);
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    return (brightness > 128) ? 'black' : 'white';
}

function setHeaderContrastColors(randombg) {
    const headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6'); // Select all header elements
    const contrastColor = getContrastColor(randombg); // Get the contrast color

    headers.forEach(header => {
        header.style.color = contrastColor; // Set the color for each header
    });
    document.getElementById("result").style.color = contrastColor;
    document.getElementById("c_title").style.color = "#FFFFFF";
    
}

function setButtonContrastColors(randbg) {
    const buttons = document.querySelectorAll('button'); // Select all button elements
    const contrastColor = getListContrastColor(randbg); // Get the contrast color

    buttons.forEach(button => {
        button.style.backgroundColor = randbuttonbg;
        button.style.color = contrastColor; // Set the color for each header
    });
    
}



function hexToRgb(hex) {
    // Remove the '#' if present
    hex = hex.replace('#', '');

    // Convert 3-digit hex to 6-digit hex
    if (hex.length === 3) {
        hex = hex.split('').map(function (h) {
            return h + h; // Duplicate each character
        }).join('');
    }

    // Parse the r, g, b values
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);

    return { r, g, b };
}




const addTaskButton = document.getElementById("addTaskButton");
addTaskButton.addEventListener("click", addTask);



const pickTaskButton = document.getElementById("c_pick_task");
pickTaskButton.addEventListener("click", pickTask);


const finish_assingment = document.getElementById("c_finish_assingment");
finish_assingment.addEventListener("click", completeTask);



const completeToggleButton = document.getElementById("completed-toggle");
completeToggleButton.addEventListener("click", toggleCompletedTasks);




















