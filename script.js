const loader = document.getElementById('loader');
const imageContainer = document.getElementById('image-container');

let photosArray = [];
let count = 10;
const apiKey = 'I8-fMyk7J_8U-fGavEWzm6UiL4HsprhQO3ugb6rG5LQ';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
let imgLoaded = 0;
let totalImg = 0;
let ready = false;

function setAttr(item, attr){
    for(let key in attr){
        item.setAttribute(key, attr[key]);
    }
}


function ImageLoaded(){
    imgLoaded++;
    if(imgLoaded === totalImg){
        ready = true;
        loader.hidden = true;
    }
}


function getPhotos(){
    imgLoaded = 0;
    totalImg = photosArray.length;
    photosArray.forEach((photo) => {
        let item = document.createElement('a');
        setAttr(item, {
            href: photo.links.html,
            target: '_blank'
        });

        let img = document.createElement('img');
        setAttr(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        img.addEventListener('load', ImageLoaded);

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
};


async function loadApi(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        getPhotos();
    }catch(error){

    }
};

window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 & ready) {
        loadApi();
    }
});


loadApi();