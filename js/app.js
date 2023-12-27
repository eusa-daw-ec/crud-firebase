// importar funciones de módulo externo firebase.js
import {
    onGetTasks,
    saveTask,
    deleteTask,
    getTask,
    updateTask,
} from "./firebase.js";

// variables globales
const taskForm = document.getElementById("task-form");
const tasksContainer = document.getElementById("tasks-container");
let editStatus = false;
let id = "";

// manejador de evento principal
window.addEventListener("DOMContentLoaded", async (e) => {
    await onGetTasks((querySnapshot) => {
        tasksContainer.innerHTML = "";
        // bucle que recorre todos los documentos del objeto querySnapshot
        querySnapshot.forEach((doc) => {
            // método .data() convierte el objeto de la DB en un objeto JS
            const task = doc.data();

            // inyectamos el código HTML de forma dinámica
            tasksContainer.innerHTML += `
                <div class="card bg-light mb-1 p-1">
                  <div class="card-header">${task.title}</div>
                  <div class="card-body">${task.description}</div>
                  <div class="card-footer">
                    <button class="btn btn-danger btn-delete" data-id="${doc.id}">Borrar</button>
                    <button class="btn btn-success btn-edit" data-id="${doc.id}">Editar</button>
                  </div>
                </div>`;
        });

        const btnsDelete = tasksContainer.querySelectorAll(".btn-delete");
        btnsDelete.forEach((btn) => {
            btn.addEventListener("click", async (e) => {
                try {
                    await deleteTask(e.target.dataset.id);
                } catch (error) {
                    console.log(error);
                }
            });
        });

        const btnsEdit = tasksContainer.querySelectorAll(".btn-edit");
        btnsEdit.forEach((btn) => {
            btn.addEventListener("click", async (e) => {
                try {
                    const doc = await getTask(e.target.dataset.id);
                    const task = doc.data();
                    taskForm["task-title"].value = task.title;
                    taskForm["task-description"].value = task.description;

                    editStatus = true;
                    id = doc.id;
                    taskForm["btn-task-form"].innerText = "Actualizar";
                } catch (error) {
                    console.log(error);
                }
            });
        });
    });
});

// manejador de evento de envío del formulario
taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = taskForm["task-title"];
    const description = taskForm["task-description"];

    try {
        if (!editStatus) {
            await saveTask(title.value, description.value);
        } else {
            await updateTask(id, {
                title: title.value,
                description: description.value,
            });

            editStatus = false;
            id = "";
            taskForm["btn-task-form"].innerText = "Grabar";
        }

        taskForm.reset();
        title.focus();
    } catch (error) {
        console.log(error);
    }
});
