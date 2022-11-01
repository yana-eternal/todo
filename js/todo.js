'use strict';

// объявления переменынх //
const field = document.querySelector('.field');
const add = document.querySelector('.add');
const list = document.querySelector('.list');

// создаем функцию, создающую таски //
function createTask(value) {
    const task = document.createElement ("div");
    task.textContent = value;
    return task;
}

// создаем функцию, добавляющую таски //
function addTask () {
    if (field.classList.contains('field')) {
        const newTask = createTask(field.value);
        list.appendChild(newTask);
        field.value = '';
    }
}