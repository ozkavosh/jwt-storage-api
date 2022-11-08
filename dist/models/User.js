"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: "string", require: true },
    password: { type: "string", require: true },
    email: { type: "string", require: true },
});
exports.default = (0, mongoose_1.model)("User", userSchema, "users");
