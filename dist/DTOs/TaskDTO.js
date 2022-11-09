"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserDTO {
    constructor({ title, body, status, createdAt, finishedAt, id, _id }) {
        this.title = title;
        this.body = body;
        this.status = status;
        this.createdAt = createdAt;
        this.finishedAt = finishedAt;
        this.id = id || _id;
    }
}
exports.default = UserDTO;
