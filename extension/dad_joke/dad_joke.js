
const next = document.getElementById("next");

const query = `
query { 
joke {
joke
}
}
`;
function getNewDadJoke() {
  fetch(`https://icanhazdadjoke.com/graphql?query=${query}`)
    .then(response => response.json())
    .then(data => {
    const { joke } = data.data.joke;
    window.joke.innerHTML = `${joke}`;
  });
}

getNewDadJoke();



  


  