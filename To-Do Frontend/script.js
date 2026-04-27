const textInput = document.getElementById('taskInput');
const addButton = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

const BASE_URL = "http://localhost:5000";

async function loadTodos() {
    const res = await fetch(`${BASE_URL}/todos/fetch`);
    const todos = await res.json();

    taskList.innerHTML = '';

    todos.forEach(todo => {
        createTaskElement(todo);
    });
}

function createTaskElement(todo) {
    const listItem = document.createElement('li');
    const deleteButton = document.createElement('button');
    const updateButton = document.createElement('button');

    listItem.textContent = todo.task;
    listItem.dataset.id = todo.id;

    deleteButton.textContent = 'Delete';
    updateButton.textContent = 'Update';

    deleteButton.addEventListener('click', async () => {
        await fetch(`${BASE_URL}/todos/deleted`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ key: todo.id })
        });

        listItem.remove();
    });

    updateButton.addEventListener('click', () => {
        const updateInput = document.createElement('input');
        const saveButton = document.createElement('button');

        saveButton.textContent = 'Save';
        updateInput.value = todo.task;

        listItem.innerHTML = '';
        listItem.appendChild(updateInput);
        listItem.appendChild(saveButton);

        updateInput.focus();

        async function saveUpdatedTask() {
            if (updateInput.value.trim() !== '') {

                const updatedTask = updateInput.value;

                await fetch(`${BASE_URL}/todos/update`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ key: todo.id, task: updatedTask })
                });

                listItem.innerHTML = updatedTask;
                listItem.appendChild(deleteButton);
                listItem.appendChild(updateButton);

                todo.task = updatedTask;

            } else {
                alert('Please enter a task.');
            }
        }

        saveButton.addEventListener('click', saveUpdatedTask);

        updateInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                saveUpdatedTask();
            }
        });
    });

    listItem.appendChild(deleteButton);
    listItem.appendChild(updateButton);
    taskList.appendChild(listItem);
}

async function addTask() {
    if (textInput.value.trim() !== '') {

        const res = await fetch(`${BASE_URL}/todos/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task: textInput.value })
        });

        const newTodo = await res.json();

        createTaskElement(newTodo);

        textInput.value = '';
    } else {
        alert('Please enter a task.');
    }
}

addButton.addEventListener('click', addTask);

textInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

loadTodos();