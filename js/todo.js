'use strict';

// объявления переменынх //
const field = document.querySelector('.field');
const button = document.querySelector('.add');
const list = document.querySelector('.list');
const checkbox = document.querySelector('.checkbox')
const form = document.querySelector('.todo-form');


// база //
// создаем функцию, создающую таски //
function createTask(value) {

    const task = document.createElement ("div");
    task.textContent = value;
    // добавляем класс для стилизации //
    task.classList.add("new-task")
    // добавляем чекбокс //
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.classList.add('status');
    task.append(checkbox);
    checkbox.addEventListener('click', completeTask);

    return task;
}
// создаем функцию, добавляющую таски //
// нужно для required //
form.onsubmit = addTask;

function addTask () {

    if (field.classList.contains('field')) {
        const newTask = createTask(field.value);
        list.appendChild(newTask);
        field.value = '';
    }
}
// complete task //
function completeTask(evt) {
    
    const target = evt.target;
    if( target.checked ) {
        target.parentElement.classList.add('success');
      } else {
        target.parentElement.classList.remove('success');
      }
}

// обработчики //
// eventLister //
button.addEventListener('submit', addTask) 




