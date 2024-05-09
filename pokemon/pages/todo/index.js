document.addEventListener('DOMContentLoaded', () => {
  const formularioToDo = document.getElementById('todo-form');
  const entradaTitulo = document.getElementById('title');
  const entradaDescricao = document.getElementById('description');
  const containerTarefas = document.getElementById('tasks');

  function renderizarTarefas() {
      containerTarefas.innerHTML = '';
      const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
      tarefas.forEach(tarefa => {
          const elementoTarefa = document.createElement('div');
          elementoTarefa.classList.add('tarefa');
          elementoTarefa.innerHTML = `
              <h3>${tarefa.titulo}</h3>
              <p>${tarefa.descricao}</p>
          `;
          containerTarefas.appendChild(elementoTarefa);
      });
  }

  function lidarComEnvioDoFormulario(evento) {
      evento.preventDefault();
      const titulo = entradaTitulo.value.trim();
      const descricao = entradaDescricao.value.trim();
      if (titulo === '') {
          alert('Por favor, insira um título para a tarefa.');
          return;
      }
      const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
      tarefas.push({ titulo, descricao });
      localStorage.setItem('tarefas', JSON.stringify(tarefas));
      renderizarTarefas();
      entradaTitulo.value = '';
      entradaDescricao.value = '';
  }

  formularioToDo.addEventListener('submit', lidarComEnvioDoFormulario);

  renderizarTarefas();
});
