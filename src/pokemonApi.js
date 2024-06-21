
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