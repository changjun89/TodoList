const body = document.querySelector("body");
const IMG_NUM = 5;

function genRandom() {
    return Math.floor(Math.random() * IMG_NUM);
}

function paintImage(imgNum) {
    const img = new Image();
    img.src = `images/${imgNum + 1}.jpg`;
    img.classList.add("bgImage");
    body.prepend(img);
}

function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();