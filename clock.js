const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector(".js-title");

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function getTime() {
    const date = new Date();
    const seconds = formatTime(date.getSeconds());
    const minutes = formatTime(date.getMinutes());
    const hours = formatTime(date.getHours());
    const days = formatTime(date.getDate());
    const months = formatTime(date.getMonth());
    const years = formatTime(date.getFullYear());

    clockTitle.innerText = `${months}/${days}  ${hours}:${minutes}:${seconds}`
}

function init() {
    setInterval(getTime, 1000);
}

init();