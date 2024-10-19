// import awardsData from './awards.json' assert { type: 'json' };

// document.addEventListener('DOMContentLoaded', () => {
//     const awards = awardsData.awards;

//     // Get references to elements for displaying the award
//     const titleElement = document.querySelector('.titles'); // Class name for title
//     const imgElement = document.getElementById('img_token'); // ID for image

//     // Display the first unassigned award
//     for (let award of awards) {
//         if (!award.assigned) {
//             titleElement.textContent = award.name;
//             imgElement.src = award.image;
//             imgElement.alt = award.description;
//             break;  // Stop after finding the first unassigned award
//         }
//     }
// });

const listEL = document.getElementById('outline');
fetch('./awards.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(token => {
            if (token.assigned) {
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
        });
    })
    .catch(error => {
        console.error('Error fetching the data:', error);
    });
