import { Todo } from "../todos/models/todo.model";

/**
 * Application filters object
 * @typedef {Object} Filters
 * @property {String} all
 * @property {String} pending
 * @property {String} completed
 */
/**
 * Filters for the todo list
 * @type {Filters}
 */
export const Filters = {
    all: "all",
    pending: "pending",
    completed: "completed",
}

/**
 * Application state object
 * @typedef {Object} State
 * @property {Array<Todo>} todos
 * @property {String} filter
 */
/**
 * The global state of the application
 * @type {State}
 */
const state = {
    todos: [
        new Todo("Learn JavaScript"),
        new Todo("Learn Vue"),
        new Todo("Learn React"),
        new Todo("Learn Angular"),
        new Todo("Learn Svelte"),
        new Todo("Learn Node.js"),
        new Todo("Learn Express"),
        new Todo("Learn Koa"),
        new Todo("Learn Nest.js"),
        new Todo("Learn Fastify"),
    ],
    filter: Filters.all,
};

/**
 * Initialize the store
 * @returns void
 * @author M. Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
const initStore = () => {
    loadStore();
    console.log("Store initialized");
};

/**
 * Load the store from local storage
 * @returns void
 * @author M. Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
const loadStore = () => {
    const storedState = localStorage.getItem("state");

    if (!storedState) {
        return;
    }

    const { todos = [], filter = Filters.all } = JSON.parse(storedState);

    state.todos = todos;
    state.filter = filter;

    console.log("Store loaded");
};

/**
 * Save the state to local storage
 * @returns void
 * @author M. Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
const saveState = () => {
    localStorage.setItem("state", JSON.stringify(state));
};

/**
 * Get the todos
 * @param {String} filter
 * @throws {Error} Invalid filter
 * @returns Array<Todo>
 * @author M. Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
const getTodos = (filter = Filters.all) => {
    switch (filter) {
        case Filters.pending:
            return state.todos.filter(todo => !todo.done);
        case Filters.completed:
            return state.todos.filter(todo => todo.done);
        case Filters.all:
            return [...state.todos];
        default:
            throw new Error(`Invalid filter: ${filter}`);
    }
};

/**
 * Create a new todo
 * @param {String} description
 * @throws {Error} Description is required
 * @returns void
 * @author M. Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
const addTodo = (description) => {
    if (!description) {
        throw new Error("Description is required");
    }

    state.todos.push(new Todo(description));

    saveState();
};

/**
 * Toggle the done status of a todo
 * @param {String} uuid
 * @returns void
 * @author M. Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
const toggleTodo = (uuid) => {
    state.todos = state.todos.map((todo) => {
        if (todo.id === uuid) {
            todo.done = !todo.done;
        }

        return todo;
    });

    saveState();
};

/**
 * Delete a todo
 * @param {String} uuid
 * @returns void
 * @author M. Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
const deleteTodo = (uuid) => {
    state.todos = state.todos.filter((todo) => todo.id !== uuid);

    saveState();
};

/**
 * Delete all completed todos
 * @returns void
 * @author M. Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
const deleteCompleted = () => {
    state.todos = state.todos.filter((todo) => !todo.done);

    saveState();
};

/**
 * Set the filter
 * @param {Filters} filter
 * @throws {Error} Invalid filter
 * @returns void
 * @author M. Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
const setFilter = (filter = Filters.all) => {
    if (!Object.keys(Filters).includes(filter)) {
        throw new Error(`Invalid filter: ${filter}`);
    }

    state.filter = filter;

    saveState();
};

/**
 * Get current filter
 * @returns String
 * @author M. Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
const getCurrentFilter = () => state.filter;

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
};
