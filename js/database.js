async function fetchBreedPossibilities() {
    const breedListUrl = "https://dog.ceo/api/breeds/list/all"

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

        console.log(json);

    } catch(error) {
        console.error(error);
    }
}

fetchBreedPossibilities();