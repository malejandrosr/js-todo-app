import { Todo } from "../models/todo.model";

/**
 * Create a HTML representation of a todo
 * @param {Todo} todo
 * @throws {Error} Todo is required
 * @returns HTMLLIElement
 * @author M. Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
export const createTodoHTML = (todo) => {
    if (!todo) {
        throw new Error("Todo is required");
    }

    const { id, description, done } = todo;

    const html = `
        <div class="view">
            <input class="toggle" type="checkbox" ${done ? "checked" : ""}>
            <label>${description}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    `;

    const liElement = document.createElement("li");
    if (done) {
        liElement.classList.add("completed");
    }
    liElement.dataset.id = id;
    liElement.innerHTML = html;

    return liElement;
};
