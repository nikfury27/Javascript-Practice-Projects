const textInput = document.getElementById('taskInput');
const addButton = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

addButton.addEventListener('click', () => {
    if(textInput.value !== ''){
        const listItem = document.createElement('li');
        const deleteButton = document.createElement('button');
        const updateButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        updateButton.textContent = 'Update';

        deleteButton.addEventListener('click', () => {
            listItem.remove();
        })

        updateButton.addEventListener( 'click' , () => {
            const update = document.createElement('input');
            const saveButton = document.createElement('button');
            saveButton.textContent = 'Save';
            listItem.appendChild(update);
            listItem.appendChild(saveButton);
            
            saveButton.addEventListener('click', () => {
                if(update.value !== ''){
                    listItem.textContent = update.value;
                    listItem.appendChild(deleteButton);
                    listItem.appendChild(updateButton);
                }
            })    
            
            update.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    saveButton.click();
                }
            });
            
            update.focus();
        })

        listItem.textContent = textInput.value;
        listItem.appendChild(deleteButton);
        listItem.appendChild(updateButton);
        taskList.appendChild(listItem);
        textInput.value = '';
    }
    else{
        alert("Please Enter Task")
    }
});

textInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addButton.click();
    }
});