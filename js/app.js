if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(() => console.log("Service Worker registrado correctamente."))
    .catch((err) =>
      console.error("Error al registrar el Service Worker:", err)
    );
}

// Referencias a elementos
const taskList = document.getElementById("taskList");
const addTaskBtn = document.getElementById("addTaskBtn");

// Renderizar lista de tareas
async function renderTasks() {
  const tasks = await getTasksFromDB();

  const taskGrid = document.getElementById("taskGrid");

  tasks.forEach((task) => {
    const taskCard = document.createElement("div");
    taskCard.classList.add("col-12", "col-md-6", "col-lg-2", "mb-4");

    taskCard.innerHTML = `
      <div class="card">
        ${
          task.image
            ? `<img src="${task.image}" class="card-img-top" alt="Imagen de tarea">`
            : ""
        }
        <div class="card-body">
          <h5 class="card-title">${task.name}</h5>
          <p class="card-text">${task.description}</p>
          <p class="card-text"><strong>Fecha de inicio:</strong> ${
            task.startDate || "No definida"
          }</p>
          <p class="card-text"><strong>Fecha de finalización:</strong> ${
            task.endDate || "No definida"
          }</p>
          <p class="card-text"><strong>Sincronizado:</strong> ${
            task.sincronizado === "Si" ? "Sí" : "No"
          }</p>
          <button class="btn btn-warning" onclick="editTask(${
            task.id
          })">Editar</button>
          <button class="btn btn-danger" onclick="deleteTask(${
            task.id
          })">Eliminar</button>
        </div>
      </div>
    `;

    taskGrid.appendChild(taskCard);
  });
}

// Editar tarea
function editTask(taskId) {
  window.location.href = `pages/edit-task.html?id=${taskId}`;
}

// Eliminar tarea
async function deleteTask(taskId) {
  const confirmation = confirm(
    "¿Estás seguro de que deseas eliminar esta tarea?"
  );
  if (confirmation) {
    try {
      await deleteTaskFromDB(taskId);
      alert("Tarea eliminada exitosamente.");
      location.reload();
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
      alert("Ocurrió un error al eliminar la tarea.");
    }
  }
}

// Inicializar
initDB().then(renderTasks).catch(console.error);

// Registro para sincronización
if ("serviceWorker" in navigator && "SyncManager" in window) {
  navigator.serviceWorker.ready.then((sw) => {
    window.addEventListener("online", () => {
      sw.sync
        .register("sync-tasks")
        .catch((err) =>
          console.error("Error al registrar la sincronización:", err)
        );
    });
  });
}
