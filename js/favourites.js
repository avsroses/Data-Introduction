// select favourites div
const addFavouriteButton = document.getElementById("add-favourite-button");
// select favourites button
const favouritesDiv = document.getElementById("favourites-div");

// current image stores image currently displayed
let currentImage = undefined;

/**
 * create new image element and append it to the favourites div
 */
function onAddFavouriteButtonClick() {
    const newImage = document.createElement("img");
    newImage.src = currentImage;
    newImage.classList.add("favourite-img");

    if (newImage.src != currentImage.src){
        favouritesDiv.append(newImage);
    }
}

addFavouriteButton.onclick = onAddFavouriteButtonClick;