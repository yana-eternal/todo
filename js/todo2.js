"use strict";
// local storage
const itemsArray = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : []; //создаем массив и проверяем на наличие lS
localStorage.setItem("tasks", JSON.stringify(itemsArray)); // конвертирует массив в строку
const data = JSON.parse(localStorage.getItem("tasks")); // конвертируем строки в нужный формат

// variable declaration
const field = document.querySelector(".field"); //input text
const addBtn = document.querySelector(".add"); // button
const clearBtn = document.querySelector(".clear"); // button
const list = document.querySelector(".list"); // task list
const form = document.querySelector(".todo-form"); // form
const priority = document.querySelector(".todo-priority"); // class important task
const warning = document.querySelector(".warning-none"); // class warning length

// function

const createTask = (value) => {
  const task = document.createElement("div");
  task.classList.add("new-task");
  const text = document.createElement("p");
  text.classList.add("text");
  text.textContent = value;

  // checkbox
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.classList.add("status", "checkbox");
  checkbox.addEventListener("click", completeTask);

  // pin
  const pin = document.createElement("button");
  pin.classList.add("pin");

  // delete
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("del-btn");
  deleteButton.addEventListener("click", deleteTask);

  task.append(checkbox);
  task.append(text);
  task.append(pin);
  task.append(deleteButton);

  return task;
};

const renderTask = (taskText) => {
  const newTask = createTask(taskText);
  if (priority.classList.contains("is-important")) {
    newTask.classList.add("is-important");
  } else {
    newTask.classList.remove("is-important");
  }

  list.appendChild(newTask);
};

const completeTask = (e) => {
  const { target } = e; // короткая запись const target = evt.target
  if (target.checked) {
    target.parentElement.classList.add("success");
  } else {
    target.parentElement.classList.remove("success");
  }
};

const deleteTask = (e) => {
  const { target } = e;
  const targetBox = target.parentElement;
  const textContent = targetBox.children[1].textContent;
  removeFromLS(textContent);
  targetBox.remove();
};
const removeFromLS = (textContent) => {
  itemsArray.splice(itemsArray.indexOf(textContent), 1);
  localStorage.setItem("tasks", JSON.stringify(itemsArray));
};

const toggle = () => {
  priority.classList.toggle("is-important");
  if (priority.classList.contains("is-important")) {
    priority.textContent = "Important task";
  } else {
    priority.textContent = "Сommon task";
  }
};

const maxLength = () => {
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

const clearTasks = () => {
  localStorage.clear();
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
};
// Listener
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

priority.addEventListener("click", toggle);

field.addEventListener("input", maxLength);

clearBtn.addEventListener("click", clearTasks);
