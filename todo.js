const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");


const TODOS_LS = "toDos";
let toDos = [];

function loadToDos() {
    const loadToDos = localStorage.getItem(TODOS_LS);
    if (loadToDos !== null) {
        const parseToDos = JSON.parse(loadToDos);
        parseToDos.forEach(function (todo) {
            paintTodo(todo.text);
        })
    }
}

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));

}

function delBtnMake() {
    const delBtn = document.createElement("button");
    delBtn.innerHTML = "❌";
    delBtn.className = "toDo__button";
    delBtn.addEventListener("click", deleteToDo);
    return delBtn;
}

function getToDoId() {
    return toDos.length + 1;
}
function pushToDo(toDoObj) {
    toDos.push(toDoObj);
}
function paintTodo(text) {
    const li = document.createElement("li");
    const delBtn = delBtnMake();
    const toDoId = getToDoId();
    const span = document.createElement("span");
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = toDoId;
    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: toDoId
    }
    pushToDo(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintTodo(currentValue);
    toDoInput.value = "";
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();