import { v4 as uuidv4 } from "uuid";

export class Todo {
    /**
     * Todo model
     * @param {String} description
     * @author M. Alejandro Salgado Ramírez <alejandrosram@outlook.com>
     */
    constructor(description) {
        this.id = uuidv4();
        this.description = description;
        this.done = false;
        this.createdAt = new Date();
    }
};
