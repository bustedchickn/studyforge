// get the site you are on
const site = window.location.hostname



let muted = false; //mutes the video +
let brokenHome = false; //removes videos from the home menu
let blurred = false; //blurs the video +
let descriptionHidden = false; //hides the video description +
let commentsHidden = false; //hides the comment section +
let suggestedHidden = false; //hides suggested videos +
let shortsHidden = false; //hides yt shorts +


let blockedlist = ["instagram","tiktok","discord","x","facebook"]
let encouragementList = ["I believe that you can focus!", "Focusing is a virtue.", "FOCUS POCUS!", "Are you getting distracted?", "Lets focus again!"]
// Function to load settings
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
            
            
            if (id === 'Shorts') { 
                shortsHidden = true;    
            }
            else if (id === 'Suggested') { 
                suggestedHidden = true;
            }
            else if (id === 'Comments'){
                commentsHidden = true;
            }
            else if (id === 'Description'){
                descriptionHidden = true;
            }
            else if (id === 'Home'){
                brokenHome = true;
            }
            else if (id === 'Blurred'){
                blurred = true;
            }
            else if (id === 'Muted'){
                muted = true;
            }
        });

        
    });
    
}















// Blocking videos
window.onload = function () {
    loadStoredCheckboxData();

    // check for blockedlist
    blockedlist.forEach(element => {
        if (site === "www."+element+".com"||site === element+".com"||site===element){
            // #todo I would love for this to be added to the timer
        alert(encouragementList[Math.floor(Math.random() * (encouragementList.length - 1) + 1)]);
    }
    });

    // Hide the right-side suggested videos (next to the video you're watching)
    var suggestedSidebar = document.querySelector('.style-scope ytd-watch-flexy'); // Common ID for the sidebar
    if (suggestedSidebar) {
        suggestedSidebar.style.display = 'none'; // Hide the entire sidebar
    } else {
        console.log("Suggested sidebar not found");
    }

    // Try another common class YouTube might use for suggestions
    var comments = document.querySelector('.style-scope ytd-item-section-renderer'); // "Up Next" at the end of video
    if (comments) {
        comments.style.display = 'none'; // Hide "Up Next" video recommendations
    } else {
        console.log("Endscreen suggestions not found");
    }
    var description = document.querySelector('#below');
    if (description) {
        description.style.display = 'none';
    }
    var vid = document.querySelector('video');
    if (vid) {
        // vid.style.display = 'none';
        if (blurred) vid.style.filter = "blur(20px)";
        if (muted) {
            vid.muted = true;
        }
    }
    var card = document.querySelector('#contents');
    if (card) {
        card.style.display = 'none';

    }
    var shortsbutt = document.querySelector('.style-scope ytd-app');
    if (shortsbutt) {
        if (shortsHidden) shortsbutt.style.display = 'none';

    }

    // Check dynamically if the elements are added later
    const observer = new MutationObserver(() => {
        var dynamicSidebar = document.querySelector('#related');
        if (dynamicSidebar) {
            if (suggestedHidden) dynamicSidebar.style.display = 'none';
        }

        var dynamicUpNext = document.querySelector('.style-scope ytd-item-section-renderer');
        if (dynamicUpNext) {
            if (commentsHidden) dynamicUpNext.style.display = 'none';
        }

        var description = document.querySelector('#below');
        if (description) {
            if (descriptionHidden) description.style.display = 'none';
        }

        var vid = document.querySelector('video');
        if (vid) {
            // vid.style.display = 'none';
            if (blurred) vid.style.filter = "blur(20px)";
            if (muted) {
                vid.muted = true;
            }
        }
        var card = document.querySelector('#contents');
        if (card) {
            if (brokenHome) card.style.display = 'none';

        }
        var shortsbutt = document.querySelector('.style-scope ytd-guide-renderer');
        var shortsbutts = document.querySelector('.style-scope ytd-app');

        if (shortsHidden) {
            if (shortsbutt) shortsbutt.style.display = 'none';
            if (shortsbutts) shortsbutts.style.display = 'none';
        }

        var guidebutt = document.querySelector('ytd-mini-guide-renderer');
        if (guidebutt && shortsHidden) guidebutt.style.display = 'none';

    });

    // Observe changes in the body and any new child elements
    observer.observe(document.body, { childList: true, subtree: true });
};


