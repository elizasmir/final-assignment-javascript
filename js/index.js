import { getPhotoURL, searchPhotos } from "./flickr.js"

function showPhotos(photos, divBlock) {
    const photoSize = document.getElementById("sizes").value;
    if (typeof photos === undefined) {
        console.log("Sorry, there is a problem try again!");
        return
    }

    photos.forEach(photo => {
        divBlock.innerHTML += `<img src='${getPhotoURL(photo, photoSize)}'>`;
    });
    get_more_btn.style.display = "block";
    back.style.display = "block";
    fond.style.display = "none";

    handleLightbox();
}

function handleLightbox() {
    const pictures = document.querySelectorAll("img");
    const lightbox = document.getElementById("lightbox");
    pictures.forEach(image => {
        image.addEventListener("click", () => {
            lightbox.classList.add("active")
            const img = document.createElement("img")
            img.src = image.src
            while (lightbox.firstChild) {
                lightbox.removeChild(lightbox.firstChild)
            }
            lightbox.appendChild(img)
        })
    })

    lightbox.addEventListener('click', e => {
        if (e.target !== e.currentTarget) return
        lightbox.classList.remove('active')
    })
}

document.getElementById("search_btn").addEventListener("click", function () {
    const divBlock = document.getElementsByClassName("images")[0];
    divBlock.innerHTML = "";
    const searchText = document.getElementById("search_input").value;
    const amountPhoto = document.getElementById("amount").value;

    searchPhotos(searchText, amountPhoto).then(photos => {
        showPhotos(photos, divBlock);
    })
});

document.getElementById("get_more_btn").addEventListener("click", function () {
    const divBlock = document.getElementsByClassName("images")[0];
    const searchText = document.getElementById("search_input").value;
    const amountPhoto = document.getElementById("amount").value;

    searchPhotos(searchText, amountPhoto).then(photos => {
        showPhotos(photos, divBlock)
    })
});

document.getElementById("back").addEventListener("click", function () {
    window.location.reload();
});



