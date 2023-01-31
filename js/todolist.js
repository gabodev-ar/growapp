const input       = document.getElementById('todolist-input');
const listTask    = document.querySelector('.lists__tasks');
const listsAlert  = document.querySelector('.lists__alert');
const settingDots = document.querySelector('.setting__dots');
const settingMenu = document.querySelector('.setting__menu');
let todos         = JSON.parse(localStorage.getItem('todo-list'));


function showTodos() {

    let liTag = '';

    if (todos) {
        todos.forEach((todo, id) => {

            let completed = todo.status == 'completed' ? 'checked' : '';
            
            liTag += `
                <li class="lists__task">
                    <label class="lists__label" for="${id}">
                        <input onclick="updateStatus(this)" class="lists__checkbox" type="checkbox" id="${id}" ${completed}>
                        <p class="lists__todo ${completed}">${todo.name}</p>
                    </label>
    
                    <div class="lists__setting setting">
                        <i class="setting__dots bi bi-three-dots"></i>
                        <ul class="setting__menu">
                            <li class="setting__edit">
                                <i class="setting__icon bi bi-pencil"></i>
                                Editar
                            </li>
                            <li onclick="deleteTask(${id})" class="setting__delete">
                                <i class="setting__icon bi bi-trash3"></i>
                                 Eliminar
                            </li>
                        </ul>
                    </div>
                </li>
                `;

        });

    }

    todos == '' ? listsAlert.style.display = 'flex' : listsAlert.style.display = 'none';

    listTask.innerHTML = liTag;

}

function updateStatus(selectedTask){
    
    selectedTask.parentNode.lastElementChild.classList.toggle('checked');
    selectedTask.checked ? todos[selectedTask.id].status = 'completed' : todos[selectedTask.id].status = 'pending';
    localStorage.setItem('todo-list', JSON.stringify(todos));

}

window.updateStatus = updateStatus;


function deleteTask(taskId){

    todos.splice(taskId, 1);
    localStorage.setItem('todo-list', JSON.stringify(todos));
    showTodos();

}

window.deleteTask = deleteTask;


input.addEventListener('keyup', (e) => {

    e.preventDefault();
    let userTask = input.value.trim();

    if (e.key == "Enter" && userTask) {

        if (!todos) {

            todos = [];

        } else {

            input.value = '';
            let taskInfo = { name: userTask, status: 'pending' };
            todos.push(taskInfo);
            localStorage.setItem('todo-list', JSON.stringify(todos));
            showTodos();
        }
    }
})



