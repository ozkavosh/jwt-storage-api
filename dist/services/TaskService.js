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
const taskSchema_1 = require("../utils/yup-schemas/taskSchema");
let instance = null;
class TaskService {
    constructor(repository) {
        this.repository = repository;
    }
    static getInstance(repository) {
        if (instance) {
            return instance;
        }
        instance = new TaskService(repository);
        return instance;
    }
    save(object, ownerEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, taskSchema_1.isValidNewTask)(object);
                const finishedAt = object.status === 'COMPLETED' ? new Date(Date.now()).toLocaleString() : undefined;
                return yield this.repository.save(Object.assign(Object.assign({}, object), { ownerEmail, status: object.status || 'CREATED', createdAt: new Date(Date.now()).toLocaleString(), finishedAt }));
            }
            catch (e) {
                console.log("Errors saving task: " + e.errors.join(" - "));
                return { errors: e.errors.join(" - ") };
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.getAll();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof id !== "string")
                return { errors: "Task id must be a string" };
            return yield this.repository.getById(id);
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof email !== "string")
                return { errors: "User email must be a string" };
            return yield this.repository.getByEmail(email);
        });
    }
    update(id, object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, taskSchema_1.isValidUpdatedTask)(object);
                return yield this.repository.update(id, object);
            }
            catch (e) {
                console.log("Errors updating task: " + e.errors.join(" - "));
                return { errors: e.errors.join(" - ") };
            }
        });
    }
    updateStatus(id, object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, taskSchema_1.isValidUpdatedTaskStatus)(object);
                const task = yield this.repository.getById(id);
                if ("errors" in task)
                    return task;
                const finishedAt = object.status === 'COMPLETED' ? new Date(Date.now()).toLocaleString() : "";
                return yield this.repository.update(id, Object.assign(Object.assign({}, task), { status: object.status, finishedAt }));
            }
            catch (e) {
                console.log("Errors updating task status: " + e.errors.join(" - "));
                return { errors: e.errors.join(" - ") };
            }
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.deleteById(id);
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.deleteAll();
        });
    }
}
exports.default = TaskService;
