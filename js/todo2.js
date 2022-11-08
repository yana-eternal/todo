"use strict";
// local storage
// const tasks = localStorage.getItem("tasks");
let itemsArray;
if (localStorage.getItem("tasks")) {
  itemsArray = JSON.parse(localStorage.getItem("tasks"));
} else {
  itemsArray = [];
}
// let itemsArray = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : []; //создаем массив и проверяем на наличие lS
localStorage.setItem("tasks", JSON.stringify(itemsArray)); // конвертирует массив в строку
let data = JSON.parse(localStorage.getItem("tasks")); // конвертируем строки в нужный формат

// объявления переменынх
const field = document.querySelector(".field");
const addBtn = document.querySelector(".add");
const clearBtn = document.querySelector(".clear");
const list = document.querySelector(".list");
const form = document.querySelector(".todo-form");
const priority = document.querySelector(".todo-priority");
const warning = document.querySelector(".warning-none");

// база

// создание таски
function createTask(value) {
  const task = document.createElement("div");
  task.classList.add("new-task");
  const text = document.createElement("p");
  text.classList.add("text");
  // const textId = (text.textContent = value);
  // text.setAttribute("id", textId);
  text.textContent = value;

  // добавляем чекбокс
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.classList.add("status", "checkbox");
  checkbox.addEventListener("click", completeTask);

  // пин
  const pin = document.createElement("button");
  pin.classList.add("pin");

  // удаление задачи
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("del-btn");
  deleteButton.addEventListener("click", deleteTask);

  task.append(checkbox);
  task.append(text);
  task.append(pin);
  task.append(deleteButton);

  return task;
}

// добавление таски

function renderTask(taskText) {
  const newTask = createTask(taskText);
  if (priority.classList.contains("is-important")) {
    newTask.classList.add("is-important");
  } else {
    newTask.classList.remove("is-important");
  }

  list.appendChild(newTask);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  itemsArray.push(field.value);
  localStorage.setItem("tasks", JSON.stringify(itemsArray));
  renderTask(field.value);
  field.value = "";
});

data.forEach((task) => {
  renderTask(task);
});

// комплит делит
function completeTask(evt) {
  const { target } = evt; // короткая запись const target = evt.target
  if (target.checked) {
    target.parentElement.classList.add("success");
  } else {
    target.parentElement.classList.remove("success");
  }
}
// удаление таски
function deleteTask(evt) {
  const { target } = evt;
  const targetBox = target.parentElement;
  const textContent = targetBox.children[1].textContent;
  removeFromLS(textContent);
  targetBox.remove();
}

function removeFromLS(textContent) {
  itemsArray.splice(itemsArray.indexOf(textContent), 1);
  localStorage.setItem("tasks", JSON.stringify(itemsArray));
}

// меняет класc задачи
priority.addEventListener("click", toggle);
function toggle() {
  priority.classList.toggle("is-important");
  if (priority.classList.contains("is-important")) {
    priority.textContent = "Important task";
  } else {
    priority.textContent = "Сommon task";
  }
}

// огранчение колво символов
field.oninput = function () {
  if (field.value.length > 80) {
    addBtn.classList.add("disabled-btn");
    addBtn.disabled = true;
    warning.classList.add("warning");
  } else {
    addBtn.classList.remove("disabled-btn");
    addBtn.disabled = false;
    warning.classList.remove("warning");
  }
};

// clearBtn.addEventListener("click", function () {
//   localStorage.clear();
//   while (list.firstChild) {
//     list.removeChild(list.firstChild);
//   }
// });
