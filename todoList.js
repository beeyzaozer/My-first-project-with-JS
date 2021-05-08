const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clear = document.querySelector( "#clear-todos");
const button = document.querySelector(".btn-danger");

eventListeners();

function eventListeners(){
form.addEventListener("submit", addTodo);
document.addEventListener("DOMContentLoaded", LoadAllTodosToUI);
secondCardBody.addEventListener("click", deleteTodo);
filter.addEventListener("keyup", filterTodos);
clear.addEventListener("click", clearAllTodos);
//button.addEventListener("click", questionToTodo);
}

function filterTodos(e) {
const  filterValue = e.target.value.toLowerCase();
const listItems = document.querySelectorAll(".list-group-item");
listItems.forEach(function (listItem) {
    const text = listItem.textContent.toLowerCase();
    if (text.indexOf(filterValue) === -1) {
        listItem.setAttribute("style" , "display : none !important");

        
    }
    else {
        listItem.setAttribute("style", "display: block");
    }
    
})
}
function deleteTodo(e){
    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
       deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
       questionToTodo(e.target.parentElement.parentElement.textContent);
       
        showAlert("success", "Todo silinmiştir");
    }
}
function deleteTodoFromStorage(index){
    let todos = getTodosFromStorage();
        todos.splice(index, 1);
localStorage.setItem("todos", JSON.stringify(todos));

}
function LoadAllTodosToUI() {
    let todos = getTodosFromStorage();
    todos.forEach(function(todo){
        addTodotoUI(todo);
    })
    }
function addTodotoUI(newTodo){
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = " <i class ='fa fa-remove'></i>";
    listItem.className = "list-group-item d-flex justify-content-between";
    
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);
    todoList.appendChild(listItem);
    todoInput.value = "";
    
}

function existsTodo(newTodo) {
    const todos = getTodosFromStorage();
    return todos.find(todo => todo === newTodo);
}
function addTodo(e) {
        const newTodo = todoInput.value.trim();
        if(newTodo){
               const result = existsTodo(newTodo);

               if(!result){

                addTodotoUI(newTodo);
                addTodoToStorage(newTodo);
                showAlert("success" , "Todo başarıyla eklendi");
               } 
               else if(confirm("Bu todo zaten var.Yine de eklemek ister misiniz?")){
                addTodotoUI(newTodo);
                addTodoToStorage(newTodo);
                showAlert("success" , "Todo başarıyla eklendi");
                }
            } else{
                showAlert("danger", "bir todo gir lütfens");
            }

            e.preventDefault();
    }


  
function getTodosFromStorage(){//Storagedan todoları alma
        let todos;
        if(localStorage.getItem("todos") === null){
            todos = [];
        }
        else{
            todos = JSON.parse(localStorage.getItem("todos"));
        }
        return todos;
    }
function addTodoToStorage(newTodo) {
        let todos =  getTodosFromStorage(); //storagedan alınan todoları çağırma 
        todos.push(newTodo);
        localStorage.setItem("todos" , JSON.stringify(todos));
     }

function showAlert(type,message) {
    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    firstCardBody.appendChild(alert);

setTimeout(function(){
    alert.remove();   
    }, 1000);
    
}
function clearAllTodos() {
    if(confirm("Bütün Todoları silmek istediğinizden emin misiniz?")){

        while (todoList.firstElementChild) {
        todoList.firstElementChild.remove();            
        }

        localStorage.removeItem("todos");

    }
    
}



