// Task data structure
let tasks = [];

// DOM elements
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const tasksList = document.getElementById("tasks-list");
const completedTasks = document.getElementById("completed-tasks");
const totalTasksSpan = document.getElementById("total-tasks");
const pendingTasksSpan = document.getElementById("pending-tasks");
const completedCountSpan = document.getElementById("completed-count");

// Add task when button is clicked
addTaskBtn.addEventListener("click", addTask);

// Add task when Enter is pressed
taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

// Add new task
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    // Add shake animation to input
    taskInput.style.animation = "shake 0.5s";
    setTimeout(() => {
      taskInput.style.animation = "";
    }, 500);
    return;
  }

  // Create task object
  const task = {
    id: Date.now(),
    text: taskText,
    completed: false,
    createdAt: new Date(),
  };

  // Add to tasks array
  tasks.push(task);

  // Clear input
  taskInput.value = "";

  // Render tasks
  renderTasks();
}

// Toggle task completion
function toggleTask(id) {
  tasks = tasks.map((task) => {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });

  renderTasks();
}

// Delete task
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

// Render tasks
function renderTasks() {
  // Clear task lists
  tasksList.innerHTML = "";
  completedTasks.innerHTML = "";

  // Filter pending and completed tasks
  const pending = tasks.filter((task) => !task.completed);
  const completed = tasks.filter((task) => task.completed);

  // Render pending tasks
  if (pending.length === 0) {
    tasksList.innerHTML =
      '<div class="empty-state"><i class="fas fa-inbox"></i><p>No active tasks</p></div>';
  } else {
    pending.forEach((task) => {
      const taskElement = createTaskElement(task);
      tasksList.appendChild(taskElement);
    });
  }

  // Render completed tasks
  if (completed.length === 0) {
    completedTasks.innerHTML =
      '<div class="empty-state"><i class="fas fa-check"></i><p>No completed tasks yet</p></div>';
  } else {
    completed.forEach((task) => {
      const taskElement = createTaskElement(task);
      completedTasks.appendChild(taskElement);
    });
  }

  // Update stats
  totalTasksSpan.textContent = tasks.length;
  pendingTasksSpan.textContent = pending.length;
  completedCountSpan.textContent = completed.length;
}

// Create task element
function createTaskElement(task) {
  const taskElement = document.createElement("div");
  taskElement.className = "task-item";
  if (task.completed) {
    taskElement.classList.add("task-completed");
  }

  taskElement.innerHTML = `
                <input type="checkbox" class="task-checkbox" ${
                  task.completed ? "checked" : ""
                }>
                <span class="task-text">${task.text}</span>
                <button class="delete-btn"><i class="fas fa-trash"></i></button>
            `;

  // Add event listeners
  const checkbox = taskElement.querySelector(".task-checkbox");
  checkbox.addEventListener("change", () => toggleTask(task.id));

  const deleteBtn = taskElement.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", () => deleteTask(task.id));

  return taskElement;
}

// Add shake animation for empty input
const style = document.createElement("style");
style.innerHTML = `
            @keyframes shake {
                0% { transform: translateX(0); }
                20% { transform: translateX(-10px); }
                40% { transform: translateX(10px); }
                60% { transform: translateX(-10px); }
                80% { transform: translateX(10px); }
                100% { transform: translateX(0); }
            }
        `;
document.head.appendChild(style);

// Initialize the app
renderTasks();
