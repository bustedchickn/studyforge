// get the site you are on
const site = window.location.hostname

// testing alert

chrome.storage.local.get(['selectedOptions'], function(result) {
const savedValues = result.selectedOptions || [];})


let blockedlist = ["facebook","instagram","tiktok","discord","x"]
let encouragementList = ["I believe that you can focus!", "Focusing is a virtue.","FOCUS POCUS!","Are you getting distracted?","Lets focus again!"]

blockedlist.forEach(element => {
    if (site === "www."+element+".com"||site === element+".com"||site===element){
        // #todo I would love for this to be added to the timer
    alert(Math.floor(Math.random() * (encouragementList.length - 1) + 1))
}
});

if(savedValues == []){
    let muted = false;
    let brokenHome = false;
    let blurred = false;
    let descriptionHidden = false;
    let commentsHidden = false;
    let suggestedHidden = false;
    let shortsHidden = false;
}else{
    let muted = true;
    let brokenHome = true;
    let blurred = true;
    let descriptionHidden = true;
    let commentsHidden = true;
    let suggestedHidden = true;
    let shortsHidden = true;
}



window.onload = function () {
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
        vid.style.filter = "blur(20px)";
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
