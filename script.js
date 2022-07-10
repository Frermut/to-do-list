const main = document.querySelector('#main');
const cardContent = document.querySelector('#card-content');
const taskForm = document.querySelector('#task-form');
const task = document.querySelector('#task');
const addBtn = document.querySelector('#add');
var isList = false;

taskForm.addEventListener('submit', controller);

window.addEventListener("DOMContentLoaded", function() {
    getTasksFromLS();
});

function deleteTaskWrapper() {
    document.querySelector(".collection").addEventListener("click", deleteTask); //Дилегирование событий - вешаем на родителя
}

function clearTasksWrapper() {
    document.querySelector('.clear-tasks').addEventListener("click", clearTasks);
}

function filterTaskWrapper() {
    document.querySelector("#filter").addEventListener("input", filterTasks);
}

function tasksInteractionInit() {
    deleteTaskWrapper();
    clearTasksWrapper();
    filterTaskWrapper();
}

function getTasksFromLS() {
    var tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks && tasks.length != 0) {
        createList();
        isList = true;
        tasks.forEach(item => {
            createTask(item);
        });
        tasksInteractionInit();
    }
}

function saveTaskInLS(item) {
    var tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks != null) {
        tasks.push(item);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
        tasks = [];
        tasks.push(item);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

function deleteTaskFromLS(val) {
    var tasks = JSON.parse(localStorage.getItem('tasks'));

    tasks.forEach(function(item, ind) {
        if (val == item) {
            tasks.splice(ind, 1);

        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function controller(event) {
    event.preventDefault(); // предотвратить стандартный экшeн(отправку формы)
    if (!task.value) {
        alert('Input a task!')
    } else {
        if (!isList) {
            createList();
            tasksInteractionInit();
            isList = true;
        }
        createTask(task.value);
        saveTaskInLS(task.value);
        task.value = "";
    }
}

function filterTasks() {
    const liArr = document.querySelectorAll(".collection li");
    liArr.forEach(element => {
        if (element.textContent.toLowerCase().trim().indexOf(this.value.toLowerCase()) > -1) {
            element.style.cssText = "display: block";
        } else {
            element.style.cssText = "display: none";
        };
    });
}

function clearTasks(event) {
    event.preventDefault();
    var tasks = JSON.parse(localStorage.getItem('tasks'));
    if (confirm('Are u sure ?')) {
        document.querySelector(".card-action").remove();
        tasks.splice(0, tasks.length);
    }
    isList = false;
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(event) {
    event.preventDefault();
    if (event.target.matches(".delete-item>*")) {
        event.target.parentElement.parentElement.remove();
        deleteTaskFromLS(event.target.parentElement.parentElement.textContent.trim());
    }

    if (!document.querySelector(".collection li")) {
        document.querySelector(".card-action").remove();
        isList = false;
    }

} // здесь метчим, достаем родитель родителя(то есть li) и удаляем

function createList() {
    const markup = `
    <div class="card-action"
        <h5 id="task-title">Tasks</h5>
        <div class="input-field col s12">
            <input type="text" name="filter" id="filter"><label for="filter">Filter Tasks</label>
        </div>
        <ul class="collection">
        
        </ul>
        <a class="clear-tasks btn black" href="">Clear Tasks</a>
    </div>`;
    cardContent.insertAdjacentHTML("afterEnd", markup);
}

function createTask(item) {
    const markup = `
    <li class="collection-item">
        ${item}
        <a href="#" class="delete-item secondary-content">
            <i class="fa fa-remove"></i>
        </a>
    </li>`
    document.querySelector(".collection").insertAdjacentHTML("beforeend", markup);
}