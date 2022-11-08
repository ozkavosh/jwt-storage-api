"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserDTO {
    constructor({ email, name, id, _id }) {
        this.email = email;
        this.name = name;
        this.id = id || _id;
    }
}
exports.default = UserDTO;
