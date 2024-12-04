const taskForm = document.getElementById("taskForm");

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await initDB();
  } catch (error) {
    console.error("Error al inicializar la base de datos:", error);
  }

  const taskImageInput = document.getElementById("taskImage");
  const previewImage = document.getElementById("previewImage");

  // Mostrar previsualización de la imagen al seleccionar un archivo
  taskImageInput.addEventListener("change", () => {
    const file = taskImageInput.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        previewImage.src = e.target.result;
        previewImage.style.display = "block";
        previewImage.style.marginInline = "auto";
      };

      reader.readAsDataURL(file);
    } else {
      previewImage.style.display = "none";
    }
  });

  const taskForm = document.getElementById("taskForm");

  taskForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const taskName = document.getElementById("taskName").value;
    const taskDescription = document.getElementById("taskDescription").value;
    const taskImageInput = document.getElementById("taskImage");
    const taskImage = taskImageInput && taskImageInput.files[0];
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    const task = {
      name: taskName,
      description: taskDescription,
      image: taskImage ? await readFileAsDataURL(taskImage) : null,
      startDate: startDate,
      endDate: endDate,
    };

    await addTaskToDB(task);
    alert("Tarea guardada exitosamente.");
    taskForm.reset();
    window.location.href = "../index.html";
  });
});
