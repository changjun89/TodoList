function greetingApi(storageKey) {
    this.get = function () {
        return localStorage.getItem(USER_LS);
    }
    this.set = function (name) {
        localStorage.setItem(USER_LS, name);
    }
}

const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");
const USER_LS = "name";
const SHOWING_CN = "showing";

const api = new greetingApi(USER_LS);

function faintingGreeting(text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `좋은 하루 보내세요~! ${text} 님`;
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    faintingGreeting(currentValue);
    saveName(currentValue);
}

function saveName(name) {
    api.set(name);
}

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit)
}

function loadName() {
    const currentUser = api.get();
    if (currentUser === null) {
        askForName();
    } else {
        faintingGreeting(currentUser);
    }

}

function init() {
    loadName();
}

init();