import { Router } from 'express';
import TaskRepository from '../repositories/TaskRepository';
import TaskService from '../services/TaskService';
import TaskController from '../controllers/TaskController';
import authRoute from '../middlewares/authRoute';

const taskRepository = TaskRepository.getInstance();
const taskService = TaskService.getInstance(taskRepository);
const taskController = new TaskController(taskService);
const taskRouter = Router();

taskRouter.post('/', authRoute, taskController.postTask.bind(taskController));
taskRouter.get('/', authRoute, taskController.getTasks.bind(taskController));
taskRouter.get('/:id', authRoute, taskController.getTask.bind(taskController));
taskRouter.patch('/:id', authRoute, taskController.updateTaskStatus.bind(taskController));
taskRouter.put('/:id', authRoute, taskController.putTask.bind(taskController));
taskRouter.delete('/:id', authRoute, taskController.deleteTask.bind(taskController));
taskRouter.delete('/', authRoute, taskController.deleteTasks.bind(taskController));

export default taskRouter;

