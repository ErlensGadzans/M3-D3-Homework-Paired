/* PICTURE ALBUM EXERCISE
Starting from the current "base" bootstrap layout, implement the following exercise:
1) When pressing on Load Images button, load the pictures from http://www.splashbase.co/api/v1/images/search?query=your query DONE
2) When pressing on Load Seconday Images, load the pictures from http://www.splashbase.co/api/v1/images/search?query=your secondary query DONE
3) When the user clicks on the "VIEW" button inside the Card, open the specified image in a modal view DONE
4) The Edit button should be replace with a "Hide" button. DONE
5) When the hide button is pressed, the whole picture card disappears. DONE
6) Replace the "9 mins" string in the card template with the ID of the Image DONE

[EXTRA]
7) Add in the "jumbotron" a search field. If there is a value there and the user press "Load Seconday Image" the API call should use the specified query as query
8) After every button is pressed, display in an alert for 5 seconds the result of the operation (es.: 20 images loaded)
9) Handle API error gracefully using alert components with the message inside
10) Add at the bottom of the page a carousel with "forest" images loaded by another API call

[EVEN MORE EXTRA]
11) Use the map method to create from your splashbase response object an array containing just the url strings
12) Use filter to modify the "forest" api call to receive only images from a source different than "unsplash"
13) Use the reduce method on the results array to sum up all the id numbers in a single one
[HINT]
You can replace the images src for making your pictures appear on button click or you can use template literals to re-create all the cards from scratch.
Use arrow functions to make some practice with them
API Docs: http://www.splashbase.co/api */

let imageLibrary = [];
let imageLibrarySecondary = [];
let allViewButtons = [];
let allEditButtons = [];
let imageSet_One;

function successAlert(numberOfImages) {
  const alert = document.querySelector(".alert-success");
  alert.classList.remove("d-none");
  alert.classList.remove("slide-out-top");
  alert.classList.add("d-block");
  alert.classList.add("swing-in-top-fwd");
  alert.innerText = `Successfully loaded ${numberOfImages} Images!`;

  setTimeout(function () {
    alert.classList.remove("d-block");
    alert.classList.add("slide-out-top");
  }, 3000);
}

async function loadImage() {
  const response = await fetch(
    `http://www.splashbase.co/api/v1/images/latest`
  ).then(async (response) => {
    let data = await response.json();
    imageLibrary.push(data);
    console.log("Loaded " + 10 + " images");
  });

  const allImgIDs = document.querySelectorAll("small");
  for (let i = 0; i < allImgIDs.length; i++) {
    allImgIDs[i].innerText = imageLibrary[0].images[i].id;
  }

  imageSet_One = true;
  successAlert(10);
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
  const allImgIDs = document.querySelectorAll("small");
  for (let i = 0; i < allImgIDs.length; i++) {
    allImgIDs[i].innerText = imageLibrarySecondary[i].id;
  }
  imageSet_One = false;
  successAlert(10);
}

function openModal() {
  const target = event.currentTarget;

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

function hideCard() {
  const targetCard =
    event.currentTarget.parentNode.parentNode.parentNode.parentNode;
  targetCard.style.display = "none";
}

function assignButtonIds() {
  const allButtons = document.querySelectorAll(".btn-outline-secondary");

  for (let i = 0; i < allButtons.length; i++) {
    if (i % 2 === 0) {
      allButtons[i].addEventListener("click", openModal);
      allButtons[i].setAttribute("data-toggle", "modal");
      allButtons[i].setAttribute("data-target", "#exampleModal");
      allViewButtons.push(allButtons[i]);
    } else {
      allButtons[i].addEventListener("click", hideCard);
      allEditButtons.push(allButtons[i]);
    }
  }
}

function replaceEditButtons() {
  allEditButtons.forEach((e) => {
    e.innerText = "Hide";
  });
}

function start() {
  assignButtonIds();
  replaceEditButtons();
}

window.onload = start();
