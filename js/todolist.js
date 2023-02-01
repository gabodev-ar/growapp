const input = document.getElementById('todolist-input');
const listTask = document.querySelector('.lists__tasks');
const listsAlert = document.querySelector('.lists__alert');
const settingDots = document.querySelector('.setting__dots');
const settingMenu = document.querySelector('.setting__menu');
const deleteAll = document.getElementById('deleteAll');
const filters = document.querySelectorAll('.todolist__span');
let todos = JSON.parse(localStorage.getItem('todo-list'));
let isEditTask = false;
let editTaskId;


//====== showTodos ========
function showTodos(filter) {

    let liTag = '';

    if (todos) {

        todos.forEach((todo, id) => {

            let isCompleted = todo.status == 'completed' ? 'checked' : '';

            if (filter == todo.status || filter == 'all') {

                liTag += `
                    <li class="lists__task">
                        <label class="lists__label" for="${id}">
                            <input onclick="updateStatus(this)" class="lists__checkbox" type="checkbox" id="${id}" ${isCompleted}>
                            <p class="lists__todo ${isCompleted}">${todo.name}</p>
                        </label>

                        <div class="lists__setting setting">
                            <i class="setting__dots bi bi-three-dots"></i>
                            <ul class="setting__menu">
                                <li onclick="editTask(${id}, '${todo.name}')" class="setting__edit">
                                    <i class="setting__icon bi bi-pencil"></i>
                                    Editar
                                </li>
                                <li onclick="deleteTask(${id}, '${filter}')" class="setting__delete">
                                    <i class="setting__icon bi bi-trash3"></i>
                                        Eliminar
                                </li>
                            </ul>
                        </div>
                    </li>
                    `;
            }
        });
    }

    todos == '' ? listsAlert.style.display = 'flex' : listsAlert.style.display = 'none';

    listTask.innerHTML = liTag;

}

showTodos('all');

//====== updateStatus ========
function updateStatus(selectedTask) {

    selectedTask.parentNode.lastElementChild.classList.toggle('checked');
    selectedTask.checked ? todos[selectedTask.id].status = 'completed' : todos[selectedTask.id].status = 'pending';
    localStorage.setItem('todo-list', JSON.stringify(todos));

}

window.updateStatus = updateStatus;


//====== deleteTask ========
function deleteTask(taskId, filter) {

    todos.splice(taskId, 1);
    localStorage.setItem('todo-list', JSON.stringify(todos));
    showTodos(filter);

}

window.deleteTask = deleteTask;

//====== editTask ========
function editTask(id, task) {
    editTaskId = id;
    isEditTask = true;
    input.value = task;
    input.focus();
}

window.editTask = editTask;

//====== deleteAll ========
deleteAll.addEventListener('click', (e) => {
    e.preventDefault();
    todos.splice(todos.lenght);
    localStorage.setItem('todo-list', JSON.stringify(todos));
    showTodos();
})

//====== filter ========
filters.forEach((filter) => {
    filter.addEventListener('click', () => {
        document.querySelector('span.active').classList.remove('active');
        filter.classList.add('active');
        showTodos(filter.id);
    });
});


//====== Ingresa nuevas tareas a través del input ========
input.addEventListener('keyup', (e) => {

    e.preventDefault();
    let userTask = input.value.trim();

    if (e.key == "Enter" && userTask) {

        if (!isEditTask) { //Evalúa si la variable de control para la función de editar una
            //tarea es falsa o verdadera.

            if (!todos) { //Si el array no existe, crea uno. Si existe, pushea la tarea.

                todos = [];

            }

            let taskInfo = { name: userTask, status: 'pending' };
            todos.push(taskInfo);

        } else { //Si isEditTask es verdadero habilita la posibilida de sobreescribir
            //un nuevo valor en el índice seleccionado del array todos.

            todos[editTaskId].name = userTask;
            input.value = '';
            isEditTask = false;
        }

        input.value = '';
        localStorage.setItem('todo-list', JSON.stringify(todos));
        showTodos('all');

    }
})



