// this is for the amount of times the finished button has bin hit
let count = 0;
let item = 0;

// const button = document.querySelector('.outline');


//This function will be called every time the button is hit

function incrementCounter() {
    console.log(count);
    // Increment the count for asinment to be done.
    count += 1;
    //for every 5 asinments done then display a token.
    if(count % 5 == 0){
        sound = document.getElementById("awardSound");
        sound.currentTime = 0;
        sound.play();
        let pain = document.getElementById('c_Outline');
        pain.style.display = "flex";
        pain.style.animation ="slide-in-out 4s ease-in-out forwards";
        fetch('../Award_Tokens/awards.json')
        .then(response => response.json())
        .then(data => {
            const maxLength = data.length;
            //If the max item has been reached then do nothing
                //set the token to assigned
                data[item].assigned = true
                console.log(data);
                //display the item
                callItem(item, data);
                
            }
        )
        item++
        // wait 5 seconds then remove the item
        setTimeout(function() {
            pain.style.display = "none";
        }, 5000);
    }
}
/*************************************************************************
 * THis function is meant to take the data from the json and display it
 *************************************************************************/
function callItem(item, data){
    // const listEL = document.getElementById('outline');
    const listEL = document.getElementById('c_Outline');
    //Check if the token can be displayed only displayed assigned tokens
    if(data[item].assigned == true){ 

        // Create the div for the image and add the image inside
        let imgHolderDiv = document.getElementById('c_img');
        imgHolderDiv.src = data[item].image; // Set image source from JSON
        imgHolderDiv.alt = data[item].name; // Set alt text as the award name


        // Create the div for the title and add the title inside
        let titleHolderDiv = document.getElementById('c_title');
        titleHolderDiv.innerText = data[item].name; // Set the title from JSON
    }
}



