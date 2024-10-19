let counter = 0;
let item = 0;
const button = document.querySelector('.outline');
function incrementCounter(){
    counter++;

    if(counter % 5 == 0){
        item++
        fetch('./awards.json')
        .then(response => response.json())
        .then(data => {

            const maxLength = data.lenght
            if(item > maxLength){
                return ;
            }
            else{
                data[item].assigned = true
                callItem(item, data);

                setTimeout(() => {
                    removeItem(item);
                }, 3000);
            
            }
        })
}
}

function callItem(item, data){
    const listEL = document.getElementById('outline');
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

function removeItem(item){
    const listEL = document.getElementById('outline');
    listEL.removeChild(listEL.children[item]);
}
