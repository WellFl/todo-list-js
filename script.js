const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const emptyMsg = document.querySelector(".empty");

let tasks = [];

function updateStats() {
  const completed = tasks.filter(t => t.completed).length;
  totalTasks.textContent = `${tasks.length} tarefas`;
  completedTasks.textContent = `${completed} concluídas`;

  emptyMsg.style.display = tasks.length === 0 ? "block" : "none";
}

function addTask() {
  const text = taskInput.value.trim();

  if (text === "") {
    alert("Digite uma tarefa antes de adicionar!");
    return;
  }

  const newTask = { text, completed: false };
  tasks.push(newTask);

  taskInput.value = "";
  renderTasks();
  updateStats();
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;

    if (task.completed) li.classList.add("completed");

    // Botão de concluir
    li.addEventListener("click", () => {
      task.completed = !task.completed;
      renderTasks();
      updateStats();
    });

    // Botão de excluir
    const delBtn = document.createElement("button");
    delBtn.textContent = "Excluir";
    delBtn.classList.add("delete-btn");
    delBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // evita marcar como concluída ao clicar
      tasks.splice(index, 1);
      renderTasks();
      updateStats();
    });

    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

addBtn.addEventListener("click", addTask);
taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
updateStats();
