function clockApi() {

    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }

    this.getTime = function () {
        const date = new Date();
        const seconds = formatTime(date.getSeconds());
        const minutes = formatTime(date.getMinutes());
        const hours = formatTime(date.getHours());
        const days = formatTime(date.getDate());
        const months = formatTime(date.getMonth());
        const years = formatTime(date.getFullYear());
        return `${months}/${days}  ${hours}:${minutes}:${seconds}`;
    }
}

const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector(".js-title");
const api = new clockApi();

function paintTime() {
    clockTitle.innerText = api.getTime();
}

function init() {
    setInterval(paintTime, 1000);
}

init();