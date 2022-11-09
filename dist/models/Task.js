"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const taskSchema = new mongoose_1.Schema({
    ownerEmail: { type: "string", require: true },
    title: { type: "string", require: true },
    body: { type: "string", require: true },
    status: { type: "string", require: true },
    finishedAt: { type: "string", require: true },
    createdAt: { type: "string" },
});
exports.default = (0, mongoose_1.model)("Task", taskSchema, "tasks");
