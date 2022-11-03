"use strict";

// объявления переменынх //
const field = document.querySelector(".field");
const button = document.querySelector(".add");
const list = document.querySelector(".list");
const checkbox = document.querySelector(".checkbox");
const form = document.querySelector(".todo-form");
const priority = document.querySelector(".todo-priority");
const warning = document.querySelector(".warning-none");

// база //

// функция, создающая таски //
function createTask(value) {
  const task = document.createElement("div");
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
  // пин //
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

// функция, добавляющая таски //
form.onsubmit = addTask; // onsubmit нужно для required и переключения класса задачи//

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

// функции, выплняющие и удаляющие таски //
function completeTask(evt) {
  const { target } = evt; // короткая запись const target = evt.target //
  if (target.checked) {
    target.parentElement.classList.add("success");
  } else {
    target.parentElement.classList.remove("success");
  }
}
function deleteTask(event) {
  const target = event.target;
  const targetBox = target.parentElement;
  targetBox.remove();
}

// обработчики  функций//
button.addEventListener("submit", addTask); // добавляет задачи при отправке

// меняет класc задачи //
priority.addEventListener("click", toggle);
function toggle() {
  priority.classList.toggle("is-important");
  if (priority.classList.contains("is-important")) {
    priority.textContent = "Важная задача";
  } else {
    priority.textContent = "Обычная задача";
  }
}

// огранчение колво символов
field.oninput = function () {
  if (field.value.length > 80) {
    button.classList.add("disabled-btn");
    button.disabled = true;
    warning.classList.add("warning");
  } else {
    button.classList.remove("disabled-btn");
    button.disabled = false;
    warning.classList.remove("warning");
  }
};
