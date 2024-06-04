const taskKey = '@tasks';

function addTask(event) {
  event.preventDefault();
  const taskId = new Date().getTime();
  const taskList = document.querySelector('#taskList');

  const form = document.querySelector('#taskForm');
  const formData = new FormData(form);

  const taskTitle = formData.get('title');
  const taskDescription = formData.get('description');

  const li = document.createElement('li');

  li.id = taskId;
  li.innerHTML = `
      <h2>${taskTitle}</h2>
      <p>${taskDescription}</p>
      <button class="edit-button" onclick="openEditDialog(${taskId})" title="Editar Tarefa">✏️</button>
      <button class="delete-button" onclick="deleteTask(${taskId})" title="Excluir Tarefa">❌</button>
  `;

  taskList.appendChild(li);

  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  tasks.push({ id: taskId, title: taskTitle, description: taskDescription });
  localStorage.setItem(taskKey, JSON.stringify(tasks));

  form.reset();
}

function openEditDialog(taskId) {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  const task = tasks.find(task => task.id == taskId);

  const editDialog = document.createElement('dialog');
  editDialog.innerHTML = `
    <form id="editForm">
      <input type="text" name="editTitle" id="editTitle" value="${task.title}" required placeholder="Informe o título da tarefa" />
      <textarea id="editDescription" name="editDescription" required placeholder="Informe a descrição da tarefa">${task.description}</textarea>
      <button type="submit">Editar</button>
      <button type="button" onclick="closeEditDialog()">Cancelar</button>
      <button type="button" onclick="deleteTask(${taskId})" title="Excluir Tarefa">Excluir</button>
    </form>
  `;
  document.body.appendChild(editDialog);

  editDialog.showModal();

  editDialog.querySelector('#editForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const editedTitle = formData.get('editTitle');
    const editedDescription = formData.get('editDescription');

    const editedTasks = tasks.map(task => {
      if (task.id == taskId) {
        return { id: task.id, title: editedTitle, description: editedDescription };
      }
      return task;
    });
    localStorage.setItem(taskKey, JSON.stringify(editedTasks));

    const taskList = document.querySelector('#taskList');
    taskList.innerHTML = editedTasks.map(task => `<li id="${task.id}"><h2>${task.title}</h2><p>${task.description}</p><button class="edit-button" onclick="openEditDialog(${task.id})" title="Editar Tarefa">✏️</button><button class="delete-button" onclick="deleteTask(${task.id})" title="Excluir Tarefa">❌</button></li>`).join('');

    editDialog.close();
  });
}

function closeEditDialog() {
  const editDialog = document.querySelector('dialog');
  editDialog.close();
  editDialog.remove();
}

function deleteTask(taskId) {
  let tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  tasks = tasks.filter(task => task.id != taskId);
  localStorage.setItem(taskKey, JSON.stringify(tasks));

  const taskElement = document.getElementById(taskId);
  taskElement.remove();
}

window.addEventListener('DOMContentLoaded', () => {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  const taskList = document.querySelector('#taskList');
  taskList.innerHTML = tasks
    .map((task) => `<li id="${task.id}"><h2>${task.title}</h2><p>${task.description}</p><button class="edit-button" onclick="openEditDialog(${task.id})" title="Editar Tarefa">✏️</button><button class="delete-button" onclick="deleteTask(${task.id})" title="Excluir Tarefa">❌</button></li>`)
    .join('');
});
