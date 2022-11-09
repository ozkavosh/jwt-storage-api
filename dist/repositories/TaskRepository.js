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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MongoDBContainer_1 = __importDefault(require("../containers/MongoDBContainer"));
const Task_1 = __importDefault(require("../models/Task"));
const TaskDTO_1 = __importDefault(require("../DTOs/TaskDTO"));
let instance = null;
class TaskRepository {
    constructor() {
        this.container = new MongoDBContainer_1.default(Task_1.default);
    }
    static getInstance() {
        if (instance) {
            return instance;
        }
        instance = new TaskRepository();
        return instance;
    }
    save(task) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newTask = yield this.container.save(task);
                return new TaskDTO_1.default(newTask);
            }
            catch (e) {
                console.log(e);
                return { errors: "Error saving task" };
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tasks = yield this.container.getAll();
                return tasks.map(task => new TaskDTO_1.default(task));
            }
            catch (e) {
                console.log(e);
                return { error: "Error fetching tasks" };
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield this.container.getById(id);
                if (task) {
                    return new TaskDTO_1.default(task);
                }
                return { errors: "Task not found" };
            }
            catch (e) {
                console.log(e);
                return { errors: "Error fetching task" };
            }
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tasks = yield this.container.getAll();
                const userTasks = tasks.filter((task) => task.ownerEmail === email);
                return userTasks.map(task => new TaskDTO_1.default(task));
            }
            catch (e) {
                console.log(e);
                return { errors: "Error fetching user tasks" };
            }
        });
    }
    update(id, updatedTask) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield this.container.update(id, updatedTask);
                if (task) {
                    return new TaskDTO_1.default(task);
                }
                return { errors: "Task not found" };
            }
            catch (e) {
                console.log(e);
                return { errors: "Error updating task" };
            }
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield this.container.deleteById(id);
                if (task) {
                    return { success: true };
                }
                return { errors: "Task not found" };
            }
            catch (e) {
                console.log(e);
                return { errors: "Error removing task" };
            }
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.container.deleteAll();
                return { success: true };
            }
            catch (e) {
                console.log(e);
                return { errors: "Error removing tasks" };
            }
        });
    }
}
exports.default = TaskRepository;
