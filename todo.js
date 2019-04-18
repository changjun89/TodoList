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
            paintTodo(todo.test);
        })
    }
}

function filterFn(toDo) {
    return toDo.id === 1;
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

function paintTodo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const newId = toDos.length + 1;
    delBtn.innerHTML = "❌";
    delBtn.className = "toDo__button";
    delBtn.addEventListener("click", deleteToDo);
    const span = document.createElement("span");
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);

    const toDoObj = {
        test: text,
        id: newId
    }
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintTodo(currentValue);
    toDoInput.value = "";
    //   localStorage.setItem(TODOS_LS, currentValue);
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();