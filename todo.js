// Butun elementler
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.getElementsByClassName("card-body")[0];
const secondCardBody = document.getElementsByClassName("card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){   // butun event listenerlar
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);

}

function clearAllTodos(e) {
    if (confirm("Hamisi silinsin?")) {
        while (todoList.firstElementChild != null) {
            todoList.removeChild(todoList.firstElementChild);
        }
    }
}

function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelector(".list-group-item");
    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1) {
            listItem.setAttribute("style","display : none !important");
        }
        else{
            listItem.setAttribute("style","display : block");
        }
    });
}


function deleteTodo(e){
    if (e.target.className=== "fa fa-remove") {
        e.target.parentElement.parentElement.remove();
        showAlert("success","Todo ugurla silindi!");
    }

}

function loadAllTodosToUI(){
   let todos = getTodosFromStorage();
   todos.forEach(element => {
     addTodoToUI(element);
   });
}

function addTodo(e){

    const newTodo = todoInput.value.trim();

    if (newTodo === "") {
        showAlert("danger","Todo elave edin");
    }
    else
    {
        addTodoToUI(newTodo);     
        showAlert("success","Todo elave edildi"); 
    }

    e.preventDefault();
}


function showAlert(type,message){

    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`;

    alert.textContent = message;

    console.log(alert);

    firstCardBody.appendChild(alert);

    setTimeout(() => {
        alert.remove();
    }, 2000);

}

function getTodosFromStorage(){    
    let todos;
    if (localStorage.getItem("todos") === null ) {
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}


function addTodoToUI(newTodo){
    const listItem = document.createElement("li");
    //Link yaratma
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>"

    listItem.className = "list-group-item d-flex justify-content-between";

    //Text node
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    // Todo liste list item elave etmek
    todoList.appendChild(listItem);
    todoInput.value = "";

    
}

