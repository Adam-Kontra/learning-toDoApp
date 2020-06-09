// Set Up Dom Variables
const form = document.querySelector('#task-form');

const addTaskTextField = document.querySelector('#task');

const ul = document.querySelector('.collection');

const clearAllTasksBtn = document.querySelector('.clear-tasks');

const filterTasksTextField = document.querySelector('#filter');



// loadAllEventListeners
loadAllEventListeners();

function loadAllEventListeners() {
  document.addEventListener('DOMContentLoaded', loadFromLocalStorage);
  form.addEventListener('submit', addTask);
  ul.addEventListener('click', removeTask);
  clearAllTasksBtn.addEventListener('click', removeAllTasks);
  filterTasksTextField.addEventListener('keyup', filterTasks);
}

// Function: loadFromLocalStorage
function loadFromLocalStorage() {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(function(task) {
    const li = document.createElement('li');
      li.className = 'collection-item';
      li.appendChild(document.createTextNode(task));
    
    const link = document.createElement('a');
      link.className = 'delete-item secondary-content';
      link.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(link);
    ul.appendChild(li);
  });
}

// Fucntion: addTask
function addTask(e) {
  if(addTaskTextField.value === '') {
    alert('Enter Your Task');
  } else {
    const li = document.createElement('li');
      li.className = 'collection-item';
      li.appendChild(document.createTextNode(addTaskTextField.value));
    
    const link = document.createElement('a');
      link.className = 'delete-item secondary-content';
      link.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(link);
    ul.appendChild(li);
    storeToLocalStorage(addTaskTextField.value);

    addTaskTextField.value = '';
    
    e.preventDefault();
  }
}

// Function: storeToLocalStorage
function storeToLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task)
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function: removeTask
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();

      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Function: removeTaskFromLocalStorage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index) {
    if(taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function: removeAllTasks
function removeAllTasks() {
  if(confirm('Are You Sure?')) {
    while(ul.firstChild) {
      ul.removeChild(ul.firstChild)
    }
  }
  removeAllTasksFromLocalStorage();
}

// Function: removeAllTasksFromLocalStorage
function removeAllTasksFromLocalStorage() {
  localStorage.clear();
}

//Function: filterTasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
