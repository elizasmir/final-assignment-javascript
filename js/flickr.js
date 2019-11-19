let page = 1;
const API_KEY = "19d3e6e0acfe9c438f368e2c2bab1c5d";


export function getPhotoURL(photo, size) {
    const url = `http://farm${photo.farm}.staticflickr.com/` +
        `${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;
    return url
}

export function searchPhotos(searchText, amountPhoto) {
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