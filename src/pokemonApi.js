
async function getPokemonData(){
    let pokemonApiUrlBase = "https://pokeapi.co/api/v2/pokemon/";

    // total number of pokemon as of 2024 is 1025 however I am only using the first 386 because those are the only ones I recognise
    let randomPokemonNumber = Math.floor(Math.random() * 386) + 1;

    let fullApiUrl = pokemonApiUrlBase + randomPokemonNumber;

    let response = await fetch(fullApiUrl)
    let responseData = await response.json();
    let result = responseData;

    // let promiseResponse = await fetch(fullApiUrl).then(data => {
    //     return data.json();
    // })
    // result = promiseResponse;

    return result;
}

async function putDataOnPage(dataToDisplay){
    document.getElementsByClassName("pokemonName")[0].textContent = dataToDisplay.name;

    let type1Display = document.getElementsByClassName("pokemonType1")[0];
    let type2Display = document.getElementsByClassName("pokemonType2")[0];

    type1Display.textContent = "Type 1: " + dataToDisplay.types[0].type.name;
    // Could also be seen as = data.types[0]["type"]["name"]; - does the exact same thing

    if (dataToDisplay.types[1]){
        // if the data includes a 2nd type, set that as well
        type2Display.textContent = "Type 2: " + dataToDisplay.types[1].type.name;
    } else {
        // if there is no 2nd type, clear the text content
        type2Display.textContent = "";
    }

    

    let imageContainer = document.getElementsByClassName("pokemonImage")[0];
    let imageElement = imageContainer.getElementsByTagName("img")[0];
    imageElement.src = dataToDisplay.sprites.front_default;
    // above is same as below - just more condensed
    // document.querySelector(".pokemonImage img").src = dataToDisplay.sprites.front_default;

    // Wishlist: add random chance to select front_shiny instead of front_default

    // real odds are 1:8192
    // testing odds are 1:4

    // Generate a random number between 1 and [odds upper limit]
    // if number is 1, use shiny sprite
    // else use default sprite

    let shinyResult = Math.floor(Math.random() * 4);
    if (shinyResult == 1){
        imageElement.src = dataToDisplay.sprites.front_shiny;
        console.log("This one is shiny!");
    } else {
        imageElement.src = dataToDisplay.sprites.front_default;
    }

    let cryUrl = dataToDisplay.cries.latest;
    let pokemonAudioElement = document.querySelector(".pokemonCry audio");
    pokemonAudioElement.src = cryUrl;

    let pokemonAudioPlayButton = document.querySelector(".pokemonCry");
    pokemonAudioPlayButton.addEventListener("click", function(){
        pokemonAudioElement.volume = 0.1;
        pokemonAudioElement.play();
    });

}

// Button calls this
async function getAndDisplayPokemonData(){
    let data = await getPokemonData();
    console.log(data);

    putDataOnPage(data);
}

document.getElementById("create-encounter").addEventListener("click", getAndDisplayPokemonData);

// Below is equivalent to the above

// let pokemonButton = document.getElementById("create-encounter");
// pokemonButton.addEventListener("click", getAndDisplayPokemonData);



async function generateTeamData(){
    // Below code will work but will take longer than promises.all
    // let teamArray = [];
    // for (let index = 0; index < 6; index++) {
    //     let data = await getPokemonData();
    //     teamArray.push(data); 
    // }
    // return teamArray;

    let promiseAllResult = await Promise.all([
        getPokemonData(),
        getPokemonData(),
        getPokemonData(),
        getPokemonData(),
        getPokemonData(),
        getPokemonData()
    ]);

    return promiseAllResult;
}

async function showTeamData(teamToDisplay){
    let teamDisplaySection = document.getElementById("team-display");
    teamDisplaySection.innerHTML = "";

    teamToDisplay.forEach((pokemon) => {

        let newPokemonCard = document.createElement("div");


        // Pokemon Name
        let pokemonNameTitle = document.createElement("h3");
        pokemonNameTitle.textContent = pokemon.name;

        newPokemonCard.appendChild(pokemonNameTitle);

        // Pokemon Image and shiny chance
        let imageContainer = document.createElement("div");
        let imageElement = document.createElement("img");

        imageContainer.appendChild(imageElement);
        
        let shinyResult = Math.floor(Math.random() * 4);
        if (shinyResult == 1){
            imageElement.src = pokemon.sprites.front_shiny;
            console.log("This one is shiny!");
        } else {
            imageElement.src = pokemon.sprites.front_default;
        }

        newPokemonCard.appendChild(imageContainer);

        // Pokemon Types
        let type1Display = document.createElement("div");
        let type2Display = document.createElement("div");

        type1Display.textContent = "Type 1: " + pokemon.types[0].type.name;
        // Could also be seen as = data.types[0]["type"]["name"]; - does the exact same thing

        if (pokemon.types[1]){
            // if the data includes a 2nd type, set that as well
            type2Display.textContent = "Type 2: " + pokemon.types[1].type.name;
        } else {
            // if there is no 2nd type, clear the text content
            type2Display.textContent = "";
        }

        newPokemonCard.appendChild(type1Display);
        newPokemonCard.appendChild(type2Display);

        // Pokemon Cry Button
        let cryUrl = pokemon.cries.latest;
        let pokemonAudioElement = document.createElement("audio");
        pokemonAudioElement.src = cryUrl;

        let pokemonAudioPlayButton = document.createElement("button");
        pokemonAudioPlayButton.textContent = "Play Cry";
        pokemonAudioPlayButton.addEventListener("click", () => {
            pokemonAudioElement.volume = 0.1;
            pokemonAudioElement.play();
        });

        pokemonAudioPlayButton.appendChild(pokemonAudioElement);
        newPokemonCard.appendChild(pokemonAudioPlayButton);
        

        

        // Apply all content to page
        teamDisplaySection.appendChild(newPokemonCard);
});
}

async function getAndShowTeamData(){
    let teamData = await generateTeamData();
    console.log(teamData);
    showTeamData(teamData);
}

document.getElementById("create-team").addEventListener("click", getAndShowTeamData);