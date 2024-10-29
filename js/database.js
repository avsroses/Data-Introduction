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

// selects breeds to display on list
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

// selects sub breeds to display for each breed when selected
async function fetchSubBreedPossibilities() {
    // restart selection
    while (subBreedSelect.options.length > 0) {
        subBreedSelect.remove(0);
    }

    // add first option
    const optionAny = document.createElement("Option");
    optionAny.text = "any";
    subBreedSelect.options.add(optionAny, "any");

    let subBreedListUrl = "";
    if (breedSelect.value !== "any") {
        subBreedListUrl = "https://dog.ceo/api/breed/" + breedSelect.value + "/list";
        const subBreedsList = await fetchFromApi(subBreedListUrl);

        for (const subBreed of subBreedsList) {
            // populate subBreed select
            const newOption = document.createElement("option"); //create new option element#
            newOption.text = subBreed;
            subBreedSelect.options.add(newOption, subBreed);
        }
    }
}

// selects random dog image or uses choices to select random
async function fetchRandomDog() {
    let randomDogUrl = "https://dog.ceo/api/breeds/image/random"

    if (breedSelect.value !== "any") {
        randomDogUrl = "https://dog.ceo/api/breed/" + breedSelect.value + "/images/random";
    }

    if (subBreedSelect.value !== "any") {
        randomDogUrl = "https://dog.ceo/api/breed/" + breedSelect.value + "/" + subBreedSelect.value + "/images/random"
    }

    const imageSource = await fetchFromApi(randomDogUrl);
    dogImage.src = imageSource
}




// link buttons to events
randomDogButton.onclick = fetchRandomDog;
breedSelect.onchange = fetchSubBreedPossibilities;


// Functions to b executed at beginning of code
fetchRandomDog();
fetchBreedPossibilities();


