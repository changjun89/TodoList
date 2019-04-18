const weather = document.querySelector(".js-weather");
const API_KEY = '1721e7cc17ddf0cccb9b61ccec539739';
const COORDS = "coords";

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function (response) {
        return response.json();
    }).then(function (json) {
        const temperature = json.main.temp;
        const place = json.name;

        weather.innerText = `${place} 의 온도는 ${temperature}`;
    })
}

function saveCoords(coordsObject) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObject));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObject = {
        latitude,
        longitude
    };
    saveCoords(coordsObject);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("can't access geo location so seoul weather get");
    const latitude = 37.57;
    const longitude = 126.98;
    const coordsObject = {
        latitude,
        longitude
    };
    saveCoords(coordsObject);
    getWeather(latitude, longitude);

}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        const longitude = parseCoords.longitude;
        const latitude = parseCoords.latitude;
        getWeather(latitude, longitude);
    }
}

function init() {
    loadCoords();
}

init();