const API_KEY = "19d3e6e0acfe9c438f368e2c2bab1c5d";

photosURL = [];
page = 1;

function searchPhotos() {
    searchText = document.getElementById("search_input").value;
    amountPhoto = document.getElementById("amount").value;
    const API_URL = `https://api.flickr.com/services/rest/` +
                    `?method=flickr.photos.search&api_key=${API_KEY}` +
                    `&text=${searchText}&content_type=1&per_page=${amountPhoto}` +
                    `&page=${page}&format=json&nojsoncallback=1`;
    return fetch(API_URL).then(response => response.json())
            .then(response => {
                page = response.photos.page + 1;
                return response.photos.photo;
            })
            .catch(error => console.log(error));
}

function getPhotoURL(photo, size) {
    const url = `http://farm${photo.farm}.staticflickr.com/` +
                `${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;
    return url
}

function showPhotos(photos, divBlock) {
    photoSize = document.getElementById("sizes").value;
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

document.getElementById("search_btn").addEventListener("click", function() {
    divBlock = document.getElementsByClassName("images")[0];
    divBlock.innerHTML = "";

    searchPhotos().then(photos => { 
        showPhotos(photos, divBlock);
    })
});

document.getElementById("get_more_btn").addEventListener("click", function() {
    divBlock = document.getElementsByClassName("images")[0];

    searchPhotos().then(photos => { 
        showPhotos(photos, divBlock)
    })
});

document.getElementById("back").addEventListener("click", function() {
    window.location.reload();
});



