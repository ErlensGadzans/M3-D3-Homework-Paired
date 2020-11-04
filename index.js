/* PICTURE ALBUM EXERCISE
Starting from the current "base" bootstrap layout, implement the following exercise:
1) When pressing on Load Images button, load the pictures from http://www.splashbase.co/api/v1/images/search?query=your query DONE
2) When pressing on Load Seconday Images, load the pictures from http://www.splashbase.co/api/v1/images/search?query=your secondary query DONE
3) When the user clicks on the "VIEW" button inside the Card, open the specified image in a modal view



4) The Edit button should be replace with a "Hide" button. 
5) When the hide button is pressed, the whole picture card disappears.
6) Replace the "9 mins" string in the card template with the ID of the Image */

let imageLibrary = [];
let imageLibrarySecondary = [];
let allViewButtons = [];
let imageSet_One;

async function loadImage() {
  const response = await fetch(
    `http://www.splashbase.co/api/v1/images/latest`
  ).then(async (response) => {
    let data = await response.json();
    imageLibrary.push(data);
    console.log("Loaded " + 10 + " images");
  });
  imageSet_One = true;
  console.log(imageSet_One);
}

async function loadImagesSecondary() {
  for (let i = 0; imageLibrarySecondary.length < 10; i++) {
    const response = await fetch(
      `http://www.splashbase.co/api/v1/images/random`
    ).then(async (response) => {
      let data = await response.json();
      imageLibrarySecondary.push(data);
      console.log("Loaded " + (i + 1) + " images");
    });
  }
  imageSet_One = false;
  console.log(imageSet_One);
}

function openModal() {
  const target = event.currentTarget;

  console.log(imageSet_One);

  for (let i = 0; i < allViewButtons.length; i++) {
    if (imageSet_One === true) {
      if (target === allViewButtons[i]) {
        const modalBody = document.querySelector(".modal-body");
        modalBody.innerHTML = `<img class="w-100" src="${imageLibrary[0].images[i].url}" />`;
      }
    } else {
      if (target === allViewButtons[i]) {
        const modalBody = document.querySelector(".modal-body");
        modalBody.innerHTML = `<img class="w-100" src="${imageLibrarySecondary[i].url}" />`;
        console.log("second set");
      }
    }
  }
}

function assignButtonIds() {
  const allButtons = document.querySelectorAll(".btn-outline-secondary");

  for (let i = 0; i < allButtons.length; i++) {
    if (i % 2 === 0) {
      allButtons[i].addEventListener("click", openModal);
      allButtons[i].setAttribute("data-toggle", "modal");
      allButtons[i].setAttribute("data-target", "#exampleModal");
      allViewButtons.push(allButtons[i]);
    }
  }
}

function start() {
  assignButtonIds();
}

window.onload = start();
