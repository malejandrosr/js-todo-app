import todoStore, { Filters } from "../../store/todo.store";

let element;

/**
 * Render pending todos
 * @param {String} elementId
 * @throws {Error} Element with ID ${elementId} not found
 * @returns void
 * @author M. Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
export const renderPendingTodos = (elementId) => {
    if (!element) {
        element = document.querySelector(elementId);
    }

    if (!element) {
        throw new Error(`Element with ID ${elementId} not found`);
    }

    element.innerHTML = todoStore.getTodos(Filters.pending).length;
};
