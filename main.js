let tasktext = document.getElementById('task');
let btn = document.getElementById('add-btn');
let tasklist = document.getElementById('task-list');

window.addEventListener('load', loadTask);
btn.addEventListener('click', newTask);

function newTask() {
  let taskText = tasktext.value.trim();
  if (taskText === '') {
    alert('Please enter a task, this is empty');
    return;
  }

  let taskitem = document.createElement('li');
  let checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  let label = document.createElement('label');
  label.textContent = taskText;
  let deletebtn = document.createElement('button');
  deletebtn.textContent = 'Delete Task';

  checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
      label.style.textDecoration = 'line-through';
    } else {
      label.style.textDecoration = 'none';
    }
    saveinLocal();
  });

  deletebtn.addEventListener('click', function () {
    tasklist.removeChild(taskitem);
    saveinLocal();
  });

  taskitem.appendChild(checkbox);
  taskitem.appendChild(label);
  taskitem.appendChild(deletebtn);
  tasklist.appendChild(taskitem);
  tasktext.value = '';
  saveinLocal();
}

function saveinLocal() {
    let tasks = [];
    let items = tasklist.getElementsByTagName('li');
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      let task = {
        text: item.getElementsByTagName('label')[0].textContent,
        status: item.getElementsByTagName('input')[0].checked
      };
      tasks.push(task);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTask() {
    let savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      let tasks = JSON.parse(savedTasks);
      for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        let taskitem = document.createElement('li');
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        let label = document.createElement('label');
        label.textContent = task.text;
        let deletebtn = document.createElement('button');
        deletebtn.textContent = 'Delete Task';
  
        if (task.status) {
          checkbox.checked = true;
          label.style.textDecoration = 'line-through';
        }
  
        checkbox.addEventListener('change', function () {
          if (checkbox.checked) {
            label.style.textDecoration = 'line-through';
          } else {
            label.style.textDecoration = 'none';
          }
          saveinLocal();
        });
  
        deletebtn.addEventListener('click', function () {
          tasklist.removeChild(taskitem);
          saveinLocal();
        });
  
        taskitem.appendChild(checkbox);
        taskitem.appendChild(label);
        taskitem.appendChild(deletebtn);
        tasklist.appendChild(taskitem);
      }
    }
  }
