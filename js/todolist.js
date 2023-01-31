const input       = document.getElementById('todolist-input');
const listTask    = document.querySelector('.lists__tasks');
const listsAlert  = document.querySelector('.lists__alert');
const settingDots = document.querySelector('.setting__dots');
const settingMenu = document.querySelector('.setting__menu');
let todos         = JSON.parse(localStorage.getItem('todo-list'));


function showTodos(){

    let li = '';

    todos.forEach((todo, id) => {
        
        li += `
        <li class="lists__task">
            <label class="lists__label" for="${id}">
                <input onclick="strikeOutParagraph(this)" class="lists__checkbox" type="checkbox" name="checkbox" id="${id}">
                <p class="lists__todo">${todo.name}</p>
            </label>

            <div class="lists__setting setting">
                <i class="setting__dots bi bi-three-dots"></i>
                <ul class="setting__menu">
                    <li class="setting__edit">
                        <i class="setting__icon bi bi-pencil"></i>
                        Editar
                    </li>
                    <li class="setting__delete">
                        <i class="setting__icon bi bi-trash3"></i>
                        Eliminar
                    </li>
                </ul>
            </div>
        </li>
        `;

        listTask.innerHTML = li;
    });
}

function strikeOutParagraph(){
    console.log('ok');
}

strikeOutParagraph();


input.addEventListener('keyup', (e)=>{

    e.preventDefault();
    let userTask = input.value.trim();

    if(e.key == "Enter" && userTask){

        if(!todos){

            todos = [];

        }else{

            input.value = '';
            let taskInfo = {name : userTask, status : 'pending'};
            todos.push(taskInfo);
            localStorage.setItem('todo-list', JSON.stringify(todos));
            listsAlert.style.display = 'none';
            showTodos();

        }
    }
})
