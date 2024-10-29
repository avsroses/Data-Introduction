// select favourites div
const addFavouriteButton = document.getElementById("add-favourite-button");
// select favourites button
const favouritesDiv = document.getElementById("favourites-div");

const downloadAllButton = document.getElementById("download-all-button");

// current image stores image currently displayed
let currentImage = undefined;
// list of all favourites used to manage repetition
let favouritesList = [];


/**
 * download image stored at given src
 * @param {String} imageSrc source of the database image
 */
async function downloadImage(imageSrc) {
    // image fetch to get specific info
    const image = await fetch(imageSrc);
    // blob contains specific data related to image file
    const imageBlob = await image.blob();
    // create a url object to point to the blob
    const imageUrl = URL.createObjectURL(imageBlob);

    // create anchor element with href imageURL
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "cuteDog.png"; //set download name

    // force download
    link.click();
}


/**
 * Download image closest to the download button clciked
 * @param {Event} event 
 */
function onDownloadClick(event) {
    const clickedButton = event.target;
    // look for closest thing above current element
    const parentDiv = clickedButton.closest("div");
    // Look for element below thats an image
    const imageElement = parentDiv.querySelector("img");

    downloadImage(imageElement.src);
}

/**
 * Downloads all images within the favourites
 */
function onDownloadAllClick() {
    for (const imageSrc of favouritesList) {
        downloadImage(imageSrc);
    }
}


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
    downloadButton.onclick = onDownloadClick;

    // append newDiv childs
    newDiv.append(newImage);
    newDiv.append(downloadButton);

    // append div to favourites div
    favouritesDiv.append(newDiv);

}


// link events
addFavouriteButton.onclick = onAddFavouriteButtonClick;
downloadAllButton.onclick = onDownloadAllClick;
