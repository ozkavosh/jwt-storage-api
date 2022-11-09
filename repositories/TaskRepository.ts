import MongoDBContainer from "../containers/MongoDBContainer";
import Task from "../models/Task";
import TaskDTO from '../DTOs/TaskDTO';

let instance: null | TaskRepository = null;

export default class TaskRepository {
  container = new MongoDBContainer(Task);

  static getInstance(): TaskRepository {
    if (instance) {
      return instance;
    }
    instance = new TaskRepository();
    return instance;
  }

  async save(task: any) {
    try {
      const newTask = await this.container.save(task);
      return new TaskDTO(newTask);
    } catch (e) {
      console.log(e);
      return { errors: "Error saving task" };
    }
  }

  async getAll() {
    try {
      const tasks = await this.container.getAll();
      return tasks.map(task => new TaskDTO(task));
    } catch (e) {
      console.log(e);
      return { error: "Error fetching tasks" };
    }
  }

  async getById(id: string) {
    try {
      const task = await this.container.getById(id);
      if (task) {
        return new TaskDTO(task);
      }
      return { errors: "Task not found" };
    } catch (e) {
      console.log(e);
      return { errors: "Error fetching task" };
    }
  }

  async getByEmail(email: string) {
    try {
      const tasks = await this.container.getAll();
      const userTasks = tasks.filter((task: any) => task.ownerEmail === email);
      return userTasks.map(task => new TaskDTO(task));
    } catch (e) {
      console.log(e);
      return { errors: "Error fetching user tasks" };
    }
  }

  async update(id: string, updatedTask: any) {
    try {
      const task = await this.container.update(id, updatedTask);
      if (task) {
        return new TaskDTO(task);
      }
      return { errors: "Task not found" };
    } catch (e) {
      console.log(e);
      return { errors: "Error updating task" };
    }
  }

  async deleteById(id: string) {
    try {
      const task = await this.container.deleteById(id);
      if (task) {
        return { success: true };
      }
      return { errors: "Task not found" };
    } catch (e) {
      console.log(e);
      return { errors: "Error removing task" };
    }
  }

  async deleteAll() {
    try {
      await this.container.deleteAll();
      return { success: true };
    } catch (e) {
      console.log(e);
      return { errors: "Error removing tasks" };
    }
  }
}
