import todoStore from "../store/todo.store";
import { renderTodos } from "./use-cases";

import html from "./app.html?raw";

/**
 * Element IDs Object
 * @typedef {Object} ElementIds
 * @property {String} todoList
 */
/**
 * Element IDs
 * @type {ElementIds}
 */
const ElementIds = {
    todoList: ".todo-list",
    newTodo: ".new-todo",
};

/**
 * Start the application
 * @param {String} elementId
 * @returns void
 * @author M. Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
export const App = (elementId) => {
    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());

        renderTodos(ElementIds.todoList, todos);
    };

    (() => {
        const app = document.createElement("div");

        app.innerHTML = html;

        document.querySelector(elementId).append(app);

        displayTodos();
    })();

    // Refs
    const newTodoInput = document.querySelector(ElementIds.newTodo);

    // Listeners
    /**
     * New Todo Input Listener
     * @param {KeyboardEvent} event - The keyboard event object.
     * @listens keyup
     */
    const newTodoInputListener = (event) => {
        console.log(event.keyCode);
        // const { , target } = event;

        // if (keyCode !== 13) {
        //     return;
        // }

        // const { value } = target;

        // if (value.trim().length === 0) {
        //     return;
        // }

        // todoStore.addTodo(value);
    };
    newTodoInput.addEventListener("keyup", newTodoInputListener);
};
