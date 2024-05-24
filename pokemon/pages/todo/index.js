const taskKey = '@tasks'

// Função para adicionar tarefa
function addTask(event) {
  event.preventDefault() // Evita o recarregamento da página
  const taskId = new Date().getTime()
  const taskList = document.querySelector('#taskList')

  const form = document.querySelector('#taskForm')
  const formData = new FormData(form)

  const taskTitle = formData.get('title')
  const taskDescription = formData.get('description')

  const li = document.createElement('li')

  li.id = taskId
  li.innerHTML = `
      <h2>${taskTitle}</h2>
      <p>${taskDescription}</p>
      <button class="edit-button" onclick="openEditDialog(${taskId})" title="Editar tarefa">✏️</button>
  `

  taskList.appendChild(li)

  // Salvar tarefas no localStorage
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
  tasks.push({ id: taskId, title: taskTitle, description: taskDescription })
  localStorage.setItem(taskKey, JSON.stringify(tasks))

  form.reset()
}

// Função para abrir o diálogo de edição
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
    </form>
  `;
  document.body.appendChild(editDialog);

  editDialog.showModal();

  // Adiciona evento de submit ao formulário de edição
  editDialog.querySelector('#editForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const editedTitle = formData.get('editTitle');
    const editedDescription = formData.get('editDescription');

    // Edita a tarefa no localStorage
    const editedTasks = tasks.map(task => {
      if (task.id == taskId) {
        return { id: task.id, title: editedTitle, description: editedDescription };
      }
      return task;
    });
    localStorage.setItem(taskKey, JSON.stringify(editedTasks));

    // Atualiza a exibição da lista de tarefas
    const taskList = document.querySelector('#taskList');
    taskList.innerHTML = editedTasks.map(task => `<li id="${task.id}"><h2>${task.title}</h2><p>${task.description}</p><button class="edit-button" onclick="openEditDialog(${task.id})" title="Editar tarefa">✏️</button></li>`).join('');

    editDialog.close();
  });
}

// Função para fechar o diálogo de edição
function closeEditDialog() {
  const editDialog = document.querySelector('dialog');
  editDialog.close();
  editDialog.remove();
}

// Carregar tarefas do localStorage ao recarregar a página
window.addEventListener('DOMContentLoaded', () => {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
  const taskList = document.querySelector('#taskList')
  taskList.innerHTML = tasks
    .map((task) => `<li id="${task.id}"><h2>${task.title}</h2><p>${task.description}</p><button class="edit-button" onclick="openEditDialog(${task.id})" title="Editar tarefa">✏️</button></li>`)
    .join('')
})
