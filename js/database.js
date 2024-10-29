const dogImage = document.getElementById("image");
const randomDogButton = document.getElementById("random-dog-button");

// selects section
const breedSelect = document.getElementById("breed-select");
const subBreedSelect = document.getElementById("sub-breed-select");


/**
 * fetch information from any api and return data in message
 * @param {string} url 
 * @returns 
 */
async function fetchFromApi(url) {
    try {

        // get response from api
        const response = await fetch(url);

        // check response okay
        if (!response.ok) {
            throw new Error("Response status: " + response.status)
        }

        // transfrom to json
        const json = await response.json();

        return json.message;

    } catch (error) {
        console.log(error);
    }
}


async function fetchBreedPossibilities() {
    const breedListUrl = "https://dog.ceo/api/breeds/list"

    const breedsList = await fetchFromApi(breedListUrl);

    for (const breed of breedsList) {
        // populate breed select
        const newOption = document.createElement("option"); //create new option element#
        newOption.text = breed;
        breedSelect.options.add(newOption, breed);
    }
}


async function fetchSubBreedPossibilities() {
    if (breedSelect.value !== "any") {
        const subBreedListUrl = "https://dog.ceo/api/breed/" + breedSelect.value + "/list";

        const subBreedsList = await fetchFromApi(subBreedListUrl);

        for (const subBreed of subBreedsList) {
            // populate breed select
            const newOption = document.createElement("option"); //create new option element#
            newOption.text = subBreed;
            subBreedSelect.options.add(newOption, subBreed);
        }
    }

}


async function fetchRandomDog() {
    let randomDogUrl = "https://dog.ceo/api/breeds/image/random"

    if (breedSelect.value !== "any") {
        randomDogUrl = "https://dog.ceo/api/breed/" + breedSelect.value + "/images/random";
    }
    
    const imageSource = await fetchFromApi(randomDogUrl);
    dogImage.src = imageSource
}



// link buttons to events
randomDogButton.onclick = fetchRandomDog;

// Functions to b executed at beginning of code
fetchRandomDog();
fetchBreedPossibilities();
fetchSubBreedPossibilities();
