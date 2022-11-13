"use strict";

// variable declaration
const field = document.querySelector(".field"); //input text
const addBtn = document.querySelector(".add"); // button
const clearBtn = document.querySelector(".clear"); // button
const list = document.querySelector(".list"); // task list
const form = document.querySelector(".todo-form"); // form
const priority = document.querySelector(".todo-priority"); // class important task
const warning = document.querySelector(".warning-none"); // class warning length
const tasks = document.querySelector(".new-task");

// function

const createTask = (value) => {
  const task = document.createElement("div");
  const text = document.createElement("p");
  const checkbox = document.createElement("input");
  const pin = document.createElement("button");
  const deleteButton = document.createElement("button");

  task.classList.add("new-task", "unpinned");
  text.classList.add("text");
  text.textContent = value;

  checkbox.setAttribute("type", "checkbox");
  checkbox.classList.add("checkbox");
  checkbox.addEventListener("click", completeTask);

  pin.classList.add("pin", "up");
  pin.addEventListener("click", pinTask);

  deleteButton.classList.add("del-btn");
  deleteButton.addEventListener("click", deleteTask);

  task.append(checkbox);
  task.append(text);
  task.append(pin);
  task.append(deleteButton);

  return task;
};

const toggleClass = () => {
  priority.classList.toggle("is-important");
  if (priority.classList.contains("is-important")) {
    priority.textContent = "Important task";
  } else {
    priority.textContent = "Common task";
  }
};

const addTask = (event) => {
  event.preventDefault();

  const newTask = createTask(field.value);
  if (priority.classList.contains("is-important")) {
    newTask.classList.add("is-important");
  }

  list.appendChild(newTask);
  field.value = "";

  saveTasks();
};

const completeTask = (event) => {
  const checkbox = event.target;
  const task = checkbox.parentElement;

  if (checkbox.checked) {
    task.classList.add("success");
  } else {
    task.classList.remove("success");
  }

  saveTasks();
};

const pinTask = (event) => {
  const pinned = event.target;
  const pinBox = pinned.parentElement;

  pinBox.classList.toggle("unpinned");
  pinBox.classList.toggle("pinned");

  // const pin = document.querySelectorAll(".pin");

  pinned.classList.toggle("up");
  pinned.classList.toggle("p");

  saveTasks();
};

const deleteTask = (event) => {
  const target = event.target;
  const targetBox = target.parentElement;

  targetBox.remove();

  saveTasks();
};

const clearTasks = () => {
  const askQuestion = confirm("Clear all tasks?");
  if (askQuestion) {
    localStorage.clear();
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
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

const saveTasks = () => {
  const tasks = document.querySelectorAll(".new-task");

  const data = [...tasks].map((task, index) => ({
    id: index,
    content: task.textContent,
    status: task.querySelector(".checkbox").checked,
    important: task.classList.contains("is-important"),
    pinTask: task.classList.contains("pinned"),
    pin: task.querySelector(".pin").classList.contains("p"),
  }));

  localStorage.setItem("tasks", JSON.stringify(data));
};

const loadTasks = () => {
  const data = JSON.parse(localStorage.getItem("tasks")) || [];

  data.forEach((task) => {
    const newTask = createTask(task.content);

    if (task.important) {
      newTask.classList.add("is-important");
    }

    if (task.status) {
      newTask.classList.add("success");
      newTask.querySelector(".checkbox").checked = true;
    }

    if (task.pinTask) {
      newTask.classList.add("pinned");
    }

    if (task.pin) {
      newTask.querySelector(".pin").classList.add("p");
    }

    list.appendChild(newTask);
  });
};

priority.addEventListener("click", toggleClass);
form.addEventListener("submit", addTask);
clearBtn.addEventListener("click", clearTasks);
field.addEventListener("input", maxLength);
document.addEventListener("DOMContentLoaded", loadTasks);
