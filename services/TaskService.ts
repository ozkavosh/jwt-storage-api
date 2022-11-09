import TaskRepository from "../repositories/TaskRepository";
import {
  isValidNewTask,
  isValidUpdatedTask,
  isValidUpdatedTaskStatus
} from "../utils/yup-schemas/taskSchema";

let instance: null | TaskService = null;

export default class TaskService {
  repository: TaskRepository;

  constructor(repository: TaskRepository) {
    this.repository = repository;
  }

  static getInstance(repository: TaskRepository): TaskService {
    if (instance) {
      return instance;
    }

    instance = new TaskService(repository);
    return instance;
  }

  async save(object: any, ownerEmail: string) {
    try {
      await isValidNewTask(object);
      const finishedAt = object.status === 'COMPLETED' ? new Date(Date.now()).toLocaleString() : undefined;
      return await this.repository.save({
        ...object,
        ownerEmail,
        status: object.status || 'CREATED',
        createdAt: new Date(Date.now()).toLocaleString(),
        finishedAt,
      });
    } catch (e: any) {
      console.log("Errors saving task: " + e.errors.join(" - "));
      return { errors: e.errors.join(" - ") };
    }
  }

  async getAll() {
    return await this.repository.getAll();
  }

  async getById(id: string) {
    if (typeof id !== "string") return { errors: "Task id must be a string" };
    return await this.repository.getById(id);
  }

  async getByEmail(email: string) {
    if (typeof email !== "string")
      return { errors: "User email must be a string" };
    return await this.repository.getByEmail(email);
  }

  async update(id: string, object: any) {
    try {
      await isValidUpdatedTask(object);
      return await this.repository.update(id, object);
    } catch (e: any) {
      console.log("Errors updating task: " + e.errors.join(" - "));
      return { errors: e.errors.join(" - ") };
    }
  }

  async updateStatus(id: string, object: any){
    try {
      await isValidUpdatedTaskStatus(object);
      const task = await this.repository.getById(id);
      if("errors" in task) return task;
      const finishedAt = object.status === 'COMPLETED' ? new Date(Date.now()).toLocaleString() : "";
      return await this.repository.update(id, { ...task, status: object.status, finishedAt });
    } catch (e: any) {
      console.log("Errors updating task status: " + e.errors.join(" - "));
      return { errors: e.errors.join(" - ") };
    }
  }

  async deleteById(id: string) {
    return await this.repository.deleteById(id);
  }

  async deleteAll() {
    return await this.repository.deleteAll();
  }
}
