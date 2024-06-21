
async function getPokemonData(){
    let pokemonApiUrlBase = "https://pokeapi.co/api/v2/pokemon/";

    let randomPokemonNumber = Math.floor(Math.random() * 1025) + 1;

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