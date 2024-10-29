const breedSelect = document.getElementById("breed-select");
const subBreeedSelect = document.getElementById("sub-breed-select");

async function fetchBreedPossibilities() {
    const breedListUrl = "https://dog.ceo/api/breeds/list"

    // try to fetch url and display error otherwise
    try {
        // get response from api
        const response = await fetch(breedListUrl);

        // check response okay
        if(!response.ok) {
            throw new Error("Response status: " + response.status)
        }

        // transfrom to json
        const json = await response.json();

        const breedsList = json.message;

        for(const breed of breedsList) {
            // populate breed select
            const newOption = document.createElement("option"); //create new option element#
            newOption.text = breed;
            breedSelect.options.add(newOption, breed);
        }

    } catch(error) {
        console.error(error);
    }
}

fetchBreedPossibilities();