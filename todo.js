const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");


const TODOS_LS = "toDos";
const toDos = [];

function loadToDos() {
    const loadToDos = localStorage.getItem(TODOS_LS);
    if (loadToDos !== null) {
        console.log(loadToDos);
        const parseToDos = JSON.parse(loadToDos);
        console.log(parseToDos);
        parseToDos.forEach(function (todo) {
            console.log(todo.test);
            paintTodo(todo.test);
        })
    }

}

function handleClick(event) {
    event.target.parentElement.remove();

}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));

}

function paintTodo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const newId = toDos.length + 1;
    delBtn.innerHTML = 'X';
    delBtn.addEventListener("click", handleClick)
    const span = document.createElement("span");
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
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