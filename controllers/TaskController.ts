import type { Request, Response } from "express";
import type TaskService from "../services/TaskService";

export default class TaskController {
  service: TaskService;

  constructor(service: TaskService) {
    this.service = service;
  }

  async postTask(req: Request, res: Response) {
    const task = req.body;
    if (task) {
      //@ts-ignore
      const newTask = await this.service.save(task, req?.user?.email as string);
      if (!("errors" in newTask)) {
        return res.json(newTask);
      } else {
        return res.status(402).json(newTask);
      }
    }
    return res.status(402).json({ error: "Missing request body" });
  }

  async getTasks(req: Request, res: Response) {
    //@ts-ignore
    const tasks = await this.service.getByEmail(req?.user?.email as string);
    if (tasks) {
      if (!("errors" in tasks)) {
        return res.json(tasks);
      } else {
        return res.status(402).json(tasks);
      }
    }
    return res.status(500).json({ error: "Server error" });
  }

  async getTask(req: Request, res: Response) {
    const id = req.params.id;
    if (id) {
      const task: any = await this.service.getById(id);
      if (!("errors" in task)) {
        task.password && delete task.password;
        return res.json(task);
      } else {
        return res.status(402).json(task);
      }
    }
    return res.status(402).json({ error: "Missing task id" });
  }

  async updateTaskStatus(req: Request, res: Response) {
    const id = req.params.id;
    const task = req.body;
    if (task && id) {
      const updatedTask = await this.service.updateStatus(id, task);
      if (!("errors" in updatedTask)) {
        return res.json(updatedTask);
      } else {
        return res.status(402).json(updatedTask);
      }
    }
    return res.status(402).json({ error: "Missing request body or task id" });
  }

  async putTask(req: Request, res: Response) {
    const id = req.params.id;
    const task = req.body;
    if (task && id) {
      const newTask = await this.service.update(id, task);
      if (!("errors" in newTask)) {
        return res.json(newTask);
      } else {
        return res.status(402).json(newTask);
      }
    }
    return res.status(402).json({ error: "Missing request body or task id" });
  }

  async deleteTask(req: Request, res: Response) {
    const id = req.params.id;
    if (id) {
      const deleteResult = await this.service.deleteById(id);
      if (deleteResult) {
        return res.json(deleteResult);
      } else {
        return res.status(402).json("Task not found");
      }
    }
    return res.status(402).json({ error: "Missing task id" });
  }

  async deleteTasks(req: Request, res: Response) {
    res.json(await this.service.deleteAll());
  }
}
