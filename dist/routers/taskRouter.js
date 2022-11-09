"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TaskRepository_1 = __importDefault(require("../repositories/TaskRepository"));
const TaskService_1 = __importDefault(require("../services/TaskService"));
const TaskController_1 = __importDefault(require("../controllers/TaskController"));
const authRoute_1 = __importDefault(require("../middlewares/authRoute"));
const taskRepository = TaskRepository_1.default.getInstance();
const taskService = TaskService_1.default.getInstance(taskRepository);
const taskController = new TaskController_1.default(taskService);
const taskRouter = (0, express_1.Router)();
taskRouter.post('/', authRoute_1.default, taskController.postTask.bind(taskController));
taskRouter.get('/', authRoute_1.default, taskController.getTasks.bind(taskController));
taskRouter.get('/:id', authRoute_1.default, taskController.getTask.bind(taskController));
taskRouter.patch('/:id', authRoute_1.default, taskController.updateTaskStatus.bind(taskController));
taskRouter.put('/:id', authRoute_1.default, taskController.putTask.bind(taskController));
taskRouter.delete('/:id', authRoute_1.default, taskController.deleteTask.bind(taskController));
taskRouter.delete('/', authRoute_1.default, taskController.deleteTasks.bind(taskController));
exports.default = taskRouter;