import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
    getFirestore,
    collection,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    getDoc,
    updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyA7Pge-QF85I0doZKnHdE7zBG1BWsmXyfg",
    authDomain: "crud-js-394b8.firebaseapp.com",
    databaseURL: "https://crud-js-394b8-default-rtdb.firebaseio.com",
    projectId: "crud-js-394b8",
    storageBucket: "crud-js-394b8.appspot.com",
    messagingSenderId: "260132245242",
    appId: "1:260132245242:web:c8fcb10944a37c8baf0343",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();

// salvar tareas

export const saveTask = (title, description) => {
    return addDoc(collection(db, "tasks"), { title, description });
};

// Listar tareas

export const onGetTasks = (callback) => {
    return onSnapshot(collection(db, "tasks"), callback);
};

// Borrar tareas

export const deleteTask = (id) => {
    return deleteDoc(doc(db, "tasks", id));
};

// Recuperar tarea

export const getTask = (id) => {
    return getDoc(doc(db, "tasks", id));
};

// Actualizar tarea

export const updateTask = (id, newFields) => {
    return updateDoc(doc(db, "tasks", id), newFields);
};