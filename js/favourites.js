// select favourites div
const addFavouriteButton = document.getElementById("add-favourite-button");
// select favourites button
const favouritesDiv = document.getElementById("favourites-div");

// current image stores image currently displayed
let currentImage = undefined;
// list of all favourites used to manage repetition
let favouritesList = [];



/**
 * create new image element and append it to the favourites div
 */
function onAddFavouriteButtonClick() {
    // check currently displayed list not in list already
    if (favouritesList.includes(currentImage)) return;
    // add current image to favourites list
    favouritesList.push(currentImage);

    // create div that will contain everything favourite related
    const newDiv = document.createElement("div");
    newDiv.classList.add("container", "favourite-card");

    // create new image and update source
    const newImage = document.createElement("img");
    newImage.src = currentImage;
    newImage.classList.add("favourite-img");

    // create download button
    const downloadButton = document.createElement("button");
    downloadButton.innerHTML = "Download";

    // append newDiv childs
    newDiv.append(newImage);
    newDiv.append(downloadButton);

    // append div to favourites div
    favouritesDiv.append(newDiv);

}


// link events
addFavouriteButton.onclick = onAddFavouriteButtonClick;