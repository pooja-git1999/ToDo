let tasks = [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

console.log('Working');

function fetchToDo(params) {
    fetch('https://jsonplaceholder.typicode.com/todos') //return promise
        .then(function (response) {
            //console.log(response);
            return response.json();
        }).then(function (data) {
            //console.log(data)
            tasks = data.slice(0, 10);
            renderList();
        })
        .catch(function (error) {
            console.log('error', error);
        })
}

function addTaskToDom(task) {
    const li = document.createElement('li');

    li.innerHTML = `
           
                <input type="checkbox" id= "${task.id}" ${task.completed ? 'checked' : ''} class="custom-checkbox">
                <label for="${task.id}">${task.title}</label>
                 <img src="delete.png" class="delete" data-id="${task.id}" />
            
  `;
    tasksList.append(li);
}

function renderList() {
    tasksList.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        addTaskToDom(tasks[i]);
    }
    tasksCounter.innerHTML = tasks.length;
}

function toggleTask(taskId) {
    const task = tasks.filter(function (task) {
        return task.id === Number(taskId)
    })

    if (task.length > 0) {
        const currentTask = task[0];

        currentTask.completed = !currentTask.completed;
        renderList();
       
        return;
    }

    showNotification('could not toggle the task');
}

function deleteTask(taskId) {
    const newTasks = tasks.filter(function (task) {
        return task.id !== Number(taskId)
    })

    tasks = newTasks;
    renderList();
}

function addTask(task) {
    if (task) {
        tasks.push(task);
        renderList();
        return;
    }
    showNotification('Task not added')
}

function showNotification(text) {
    alert(text);
}


function handleInputKeypress(e) {
    if (e.key === 'Enter') {
        const text = e.target.value;
        // console.log('text', text);

        if (!text) {
            showNotification('task text can`t be empty');
            return;
        }

        const task = {
            title: text,
            id: Date.now(),
            completed: false
        }
        e.target.value = '';
        addTask(task);
    }
}

function handleClickListener(e) {
    const target = e.target;
    // console.log(target);

    if (target.className === 'delete') {
        const taskId = target.dataset.id;
        deleteTask(taskId);
        return;
    } else if (target.className === 'custom-checkbox') {
        const taskId = target.id;
        toggleTask(taskId);
        return;
    }
}
function initializeApp() {
    fetchToDo();
    addTaskInput.addEventListener('keyup', handleInputKeypress);
    document.addEventListener('click', handleClickListener);
}
initializeApp();

var greet = document.createElement("p");
greet.innerHTML = `Hello ${name}`;
var name = "Ninja";
document.body.append(greet);
document.body.append(`Nice to meet you, ${name}!`);
console.log(greet);