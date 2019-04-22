function toDoApi(storageKey) {
    const STORAGE_KEY = storageKey;
    let toDoList = [];

    this.get = function () {
        return toDoList;
    };

    this.add = function (toDo) {
        const toDoObj = {
            id: toDoList.length + 1,
            text: toDo
        };
        toDoList.push(toDoObj);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toDoList));

    };

    this.delete = function (id) {
        const cleanToDos = toDoList.filter(function (toDo) {
            return toDo.id !== parseInt(id);
        });
        toDoList = cleanToDos;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toDoList));
    };
    this.nextToDoId = function () {
        return toDoList.length + 1;
    };

    apiInit = function () {
        const loadToDos = localStorage.getItem(storageKey);
        if (loadToDos !== null) {
            toDoList = JSON.parse(loadToDos);
        }
    };

    apiInit();

}

const TODOS_LS = "toDos";
const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const toDoApiObj = new toDoApi(TODOS_LS);


function deleteToDo(event) {
    const id = event.target.parentNode.id;
    toDoApiObj.delete(id);
    refreshData();
}

function delBtnMake() {
    const delBtn = document.createElement("button");
    delBtn.innerHTML = "❌";
    delBtn.className = "toDo__button";
    delBtn.addEventListener("click", deleteToDo);
    return delBtn;
}

function refreshData() {
    toDoList.innerText = "";
    const toDos = toDoApiObj.get();
    toDos.forEach(function (toDo) {
        paintTodo(toDo.text);
    })
}

function paintTodo(text) {
    const li = document.createElement("li");
    const delBtn = delBtnMake();
    const toDoId = toDoApiObj.nextToDoId();
    const span = document.createElement("span");
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = toDoId;
    toDoList.appendChild(li);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintTodo(currentValue);
    toDoInput.value = "";
    toDoApiObj.add(currentValue);
}

function init() {
    refreshData();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();