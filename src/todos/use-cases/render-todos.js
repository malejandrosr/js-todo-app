import { Todo } from "../models/todo.model";
import { createTodoHTML } from "./create-todo-html";

let element;

/**
 * Render todos in the DOM
 * @param {String} elementId
 * @param {Array<Todo>} todos
 * @throws {Error} Element with id ${elementId} not found
 * @returns void
 * @author M. Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
export const renderTodos = (elementId, todos = []) => {
    if (!element) {
        element = document.querySelector(elementId);
    }

    if (!element) {
        throw new Error(`Element with id ${elementId} not found`);
    }

    element.innerHTML = "";

    todos.forEach((todo) => {
        element.append(createTodoHTML(todo));
    });
};
