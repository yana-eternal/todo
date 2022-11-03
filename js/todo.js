"use strict";

// объявления переменынх //
const field = document.querySelector(".field");
const button = document.querySelector(".add");
const list = document.querySelector(".list");
const checkbox = document.querySelector(".checkbox");
const form = document.querySelector(".todo-form");
const priority = document.querySelector(".todo-priority");

// база //
// создаем функцию, создающую таски //
function createTask(value) {
  const task = document.createElement("div");
  // добавляем класс для стилизации //
  task.classList.add("new-task");
  const text = document.createElement("p");
  text.classList.add("text");
  text.textContent = value;
  // добавляем чекбокс //
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.classList.add("status", "checkbox");
  task.append(checkbox);
  task.append(text);
  checkbox.addEventListener("click", completeTask);
  // добавляем пин //
  const pin = document.createElement("button");
  pin.classList.add("pin");
  task.append(pin);
  // удаление задачи //
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("del-btn");
  task.append(deleteButton);
  deleteButton.addEventListener("click", deleteTask);
  return task;
}
// создаем функцию, добавляющую таски //
// нужно для required и переключения класса задачи//
form.onsubmit = addTask;

function addTask(event) {
  event.preventDefault();
  const newTask = createTask(field.value);
  if (priority.classList.contains("is-important")) {
    newTask.classList.add("is-important");
    list.appendChild(newTask);
    field.value = "";
  }
  list.appendChild(newTask);
  field.value = "";
}
// complete task //
function completeTask(evt) {
  // короткая запись //
  const { target } = evt;
  //   const target = evt.target;
  if (target.checked) {
    target.parentElement.classList.add("success");
  } else {
    target.parentElement.classList.remove("success");
  }
}
// удаление задачи //
function deleteTask(event) {
  const target = event.target;
  const targetBox = target.parentElement;
  targetBox.remove();
}

// обработчики //
// eventLister //
button.addEventListener("submit", addTask);

// класc задачи //
priority.addEventListener("click", toggle);
function toggle() {
  priority.classList.toggle("is-important");
  if (priority.classList.contains("is-important")) {
    priority.textContent = "Важная задача";
  } else {
    priority.textContent = "Обычная задача";
  }
}
