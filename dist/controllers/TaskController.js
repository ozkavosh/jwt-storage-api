"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class TaskController {
    constructor(service) {
        this.service = service;
    }
    postTask(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const task = req.body;
            if (task) {
                //@ts-ignore
                const newTask = yield this.service.save(task, (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.email);
                if (!("errors" in newTask)) {
                    return res.json(newTask);
                }
                else {
                    return res.status(402).json(newTask);
                }
            }
            return res.status(402).json({ error: "Missing request body" });
        });
    }
    getTasks(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            //@ts-ignore
            const tasks = yield this.service.getByEmail((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.email);
            if (tasks) {
                if (!("errors" in tasks)) {
                    return res.json(tasks);
                }
                else {
                    return res.status(402).json(tasks);
                }
            }
            return res.status(500).json({ error: "Server error" });
        });
    }
    getTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (id) {
                const task = yield this.service.getById(id);
                if (!("errors" in task)) {
                    task.password && delete task.password;
                    return res.json(task);
                }
                else {
                    return res.status(402).json(task);
                }
            }
            return res.status(402).json({ error: "Missing task id" });
        });
    }
    updateTaskStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const task = req.body;
            if (task && id) {
                const updatedTask = yield this.service.updateStatus(id, task);
                if (!("errors" in updatedTask)) {
                    return res.json(updatedTask);
                }
                else {
                    return res.status(402).json(updatedTask);
                }
            }
            return res.status(402).json({ error: "Missing request body or task id" });
        });
    }
    putTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const task = req.body;
            if (task && id) {
                const newTask = yield this.service.update(id, task);
                if (!("errors" in newTask)) {
                    return res.json(newTask);
                }
                else {
                    return res.status(402).json(newTask);
                }
            }
            return res.status(402).json({ error: "Missing request body or task id" });
        });
    }
    deleteTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (id) {
                const deleteResult = yield this.service.deleteById(id);
                if (deleteResult) {
                    return res.json(deleteResult);
                }
                else {
                    return res.status(402).json("Task not found");
                }
            }
            return res.status(402).json({ error: "Missing task id" });
        });
    }
    deleteTasks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json(yield this.service.deleteAll());
        });
    }
}
exports.default = TaskController;
