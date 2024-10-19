let tasks = [];
let isPicking = false;

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    const task = taskInput.value.trim();
    if (task !== "") {
        tasks.push(task);

        // Update the task list display
        const li = document.createElement("li");
        li.textContent = task;
        taskList.appendChild(li);

        // Clear the input
        taskInput.value = "";
    }
}


function pickTask() {
    if (isPicking || tasks.length === 0) {
        alert("Please add some tasks first, or wait until the current task is picked!");
        return;
    }

    isPicking = true;

    // Get the audio element
    const taskSound = document.getElementById("taskSound");

    const taskListItems = document.querySelectorAll("#taskList li");
    let currentIndex = 0; // Start at a random index
    let delay = 100;  // Start with a short delay
    const totalCycles = 30 + Math.floor(Math.random() * 10); // Random number of cycles to create unpredictability
    let cycleCount = 0; // Track the number of cycles completed

    function highlightNextItem() {
        // Remove highlight from all items
        taskListItems.forEach(item => item.classList.remove("highlight"));

        // Highlight the current item
        taskListItems[currentIndex].classList.add("highlight");

        // Play sound each time a new item is highlighted
        taskSound.currentTime = 0; // Reset to the beginning
        taskSound.play(); // Play the sound

        // Move to the next item, looping back to the start if necessary
        currentIndex = (currentIndex + 1) % tasks.length;

        // Increase delay gradually to slow down the highlight cycling
        delay += 10;

        // Continue the cycle until we've done enough total cycles
        if (cycleCount < totalCycles) {
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

    function highlightRandItem() {
        // Remove highlight from all items
        taskListItems.forEach(item => item.classList.remove("highlight"));

        // Highlight the current item
        taskListItems[currentIndex].classList.add("highlight");

        // Move to the next item, looping back to the start if necessary
        currentIndex = Math.floor(Math.random() * (tasks.length - 1));

        // Play sound each time a new item is highlighted
        taskSound.currentTime = 0; // Reset to the beginning
        taskSound.play(); // Play the sound

        // Increase delay gradually to slow down the highlight cycling
        delay += 10;

        // Continue the cycle until we've done enough total cycles
        if (cycleCount < totalCycles) {
            setTimeout(highlightRandItem, delay);
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
