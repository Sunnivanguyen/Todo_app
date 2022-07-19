"use strict";

//Model section
//If localstorage has a todos array, then use it
//Otherwise,use the default array.
let todos;

//Retrieve localStore
const savedTodos = JSON.parse(localStorage.getItem("todos"));
//Check if it's an array
if (Array.isArray(savedTodos)) {
  todos = savedTodos;
} else {
  todos = [
    {
      title: "Get groceries",
      dueDate: "17/06/2022",
      id: "id1",
    },
    {
      title: "Wash car",
      dueDate: "18/06/2022",
      id: "id2",
    },
    {
      title: "Make Dinner",
      dueDate: "18/06/2022",
      id: "id3",
    },
  ];
}

// Creates a todo
function createTodo(title, dueDate) {
  const id = "" + new Date().getTime(); //This chunk of code get the current time in milisecond, so that when ever we run this code it would give another different value which never be the same value with previous one

  todos.push({
    title: title,
    dueDate: dueDate,
    id: id,
  }); //put this new value into the array
  saveTodo();
}

//Deletes a todo
function removeTodo(idToDelete) {
  todos = todos.filter(function (todo) {
    //If the id of this todo matches idTodelete, return false
    //For everything else, return true
    if (todo.id === idToDelete) {
      return false;
    } else {
      return true;
    }
  });
  saveTodo();
}

function saveTodo() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function toggleTodo(todoId, checked) {
  todos.forEach(function (todo) {
    if (todo.id === todoId) {
      todo.isDone = checked;
    }
  });
}

// Controller section
// This function put a new item to the todos array whenever we type a new todo task in UI
function addTodo() {
  const textBox = document.getElementById("todo-title"); //choose ipnut element
  const title = textBox.value; //assigned with value of the input

  const datePicker = document.getElementById("date-picker");
  const dueDate = datePicker.value;

  createTodo(title, dueDate);

  render(); // this function will reset the list and add new values whenever it is called
}

let addTodobtn = document.getElementById("add-todo");
addTodobtn.onclick = addTodo;

function deleteTodo(event) {
  const deleteButton = event.target;
  const idToDelete = deleteButton.id;
  removeTodo(idToDelete);
  render();
}

function checkTodo(event) {
  const checkBox = event.target;

  const todoId = checkBox.dataset.todoId;
  const checked = checkBox.checked;

  toggleTodo(todoId, checked);
  render();
}

//This function will go add a new div element whenever a new item is added to the todos array

//View section
function createCheckBox(element, todo) {
  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.onchange = checkTodo;
  checkBox.dataset.todoId = todo.id;
  if (todo.isDone === true) {
    checkBox.checked = true;
  } else {
    checkBox.checked = false;
  }
  element.prepend(checkBox);
}

function render() {
  //reset our list
  document.getElementById("todo-list").innerHTML = ""; // set all todo items inside a box (div), then choose this box and assign to it an empty value

  todos.forEach(function (todo) {
    const element = document.createElement("div"); //create a new element for each new item of todos array
    element.innerText = todo.title + " " + todo.dueDate; //whatever put inside the function as an argument would become this new div element's text content
    createCheckBox(element, todo);

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.style = "margin-left: 12px;";
    deleteButton.onclick = deleteTodo;
    deleteButton.id = todo.id;
    element.appendChild(deleteButton);

    const todoList = document.getElementById("todo-list"); // choose this big div box again
    todoList.appendChild(element); // inside the box, add a new element which just has been created
  });
}

render();
