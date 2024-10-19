// this is for the amount of times the finished button has bin hit
let counter = 0;
let item = 0;

const button = document.querySelector('.outline');

//This function will be called everytie the finished assinment button is hit
function incrementCounter(){
    // Increment the counter for asinment to be done.
    counter++;
    //for every 5 asinments done then display a token.
    if(counter % 5 == 0){
        item++
        fetch('./awards.json')
        .then(response => response.json())
        .then(data => {

            const maxLength = data.length
            //If the max item has been reached then do nothing
            if(item > maxLength){
                return ;
            }
            // if the last item has not been displayed show the next one in line.
            else{
                // set the next token item to be assigned
                data[item].assigned = true
                //display the item
                callItem(item, data);
                // wait 6 seconds then remove the item
                setTimeout(() => {
                    removeItem(item);
                }, 6000);
            
            }
        })
}
}
/*************************************************************************
 * THis function is meant to take the data from the json and display it
 *************************************************************************/
function callItem(item, data){
    const listEL = document.getElementById('outline');
    //Check if the token can be displayed only displayed assigned tokens
    if(data[item].assigned == true){ 
        // Create the container div for the outline
        const outlineDiv = document.createElement('div');
        outlineDiv.classList.add('outline');

        // Create the div for the image and add the image inside
        const imgHolderDiv = document.createElement('div');
        imgHolderDiv.classList.add('img_holder');

        const imgEl = document.createElement('img');
        imgEl.classList.add('img_token');
        imgEl.src = token.image; // Set image source from JSON
        imgEl.alt = token.name; // Set alt text as the award name

        imgHolderDiv.appendChild(imgEl);

        // Create the div for the title and add the title inside
        const titleHolderDiv = document.createElement('div');
        titleHolderDiv.classList.add('title_holder');

        const titleEl = document.createElement('h2');
        titleEl.classList.add('titles');
        titleEl.textContent = token.name; // Set the title from JSON

        titleHolderDiv.appendChild(titleEl);

        // Append the image and title to the outline div
        outlineDiv.appendChild(imgHolderDiv);
        outlineDiv.appendChild(titleHolderDiv);

        // Finally, append the outline div to the main list element
        listEL.appendChild(outlineDiv);
    }
}

/*************************************************
* This function removes it from being displayed
**************************************************/
function removeItem(item){
    const listEL = document.getElementById('outline');
    listEL.removeChild(listEL.children[item]);
}
