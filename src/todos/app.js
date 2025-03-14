import todoStore, { Filters } from "../store/todo.store";
import { renderPendingTodos, renderTodos } from "./use-cases";

import html from "./app.html?raw";

/**
 * Element IDs Object
 * @typedef {Object} ElementIds
 * @property {String} todoList
 * @property {String} newTodo
 * @property {String} clearCompleted
 * @property {String} filter
 * @property {String} pendingCount
 */
/**
 * Element IDs
 * @type {ElementIds}
 */
const ElementIds = {
    todoList: ".todo-list",
    newTodo: ".new-todo",
    clearCompleted: ".clear-completed",
    filter: ".filter",
    pendingCount: "#pending-count",
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

        updateTodoCount();
    };

    const updateTodoCount = () => {
        renderPendingTodos(ElementIds.pendingCount);
    };

    (() => {
        const app = document.createElement("div");

        app.innerHTML = html;

        document.querySelector(elementId).append(app);

        displayTodos();
    })();

    // Refs
    const newTodoInput = document.querySelector(ElementIds.newTodo);
    const todoListUl = document.querySelector(ElementIds.todoList);
    const clearCompletedButton = document.querySelector(ElementIds.clearCompleted);
    const filtersLi = document.querySelectorAll(ElementIds.filter);

    // Listeners
    /**
     * New Todo Input Listener
     * @param {KeyboardEvent} event - The keyboard event object.
     * @listens keyup
     */
    const newTodoInputListener = (event) => {
        const { key, target } = event;
        if (key !== 'Enter') {
            return;
        }

        const { value } = target;
        if (value.trim().length === 0) {
            return;
        }

        todoStore.addTodo(value);

        displayTodos();

        target.value = "";
    };
    newTodoInput.addEventListener("keyup", newTodoInputListener);

    /**
     * Todo List Listener
     * @param {MouseEvent} event - The mouse event object.
     * @listens click
     */
    const todoListListener = (event) => {
        const { target } = event;

        const element = target.closest("[data-id]");

        todoStore.toggleTodo(element.dataset.id);

        displayTodos();
    };
    todoListUl.addEventListener("click", todoListListener);

    /**
     * Todo List Listener
     * @param {MouseEvent} event - The mouse event object.
     * @listens click
     */
    const todoListRemoveListener = (event) => {
        const { target } = event;

        const isDestroyButton = target.classList.contains("destroy");
        const element = target.closest("[data-id]");

        if (!isDestroyButton || !element) {
            return;
        }

        todoStore.deleteTodo(element.dataset.id);

        displayTodos();
    };
    todoListUl.addEventListener("click", todoListRemoveListener);

    /**
     * Clear Completed Listener
     * @param {MouseEvent} event - The mouse event object.
     * @listens click
     */
    const clearCompletedListener = () => {
        todoStore.deleteCompleted();

        displayTodos();
    };
    clearCompletedButton.addEventListener("click", clearCompletedListener);

    /**
     * Filters Listener
     * @param {MouseEvent} event - The mouse event object.
     * @listens click
     */
    const filtersListener = (event) => {
        filtersLi.forEach((filter) => filter.classList.remove("selected"));

        const { target } = event;

        target.classList.add("selected");

        switch (target.dataset.filter) {
            case "all":
                todoStore.setFilter(Filters.all);
                break;
            case "pending":
                todoStore.setFilter(Filters.pending);
                break;
            case "completed":
                todoStore.setFilter(Filters.completed);
                break;
        }

        displayTodos();
    };
    filtersLi.forEach((filter) => filter.addEventListener("click", filtersListener));
};
