import MongoDBContainer from "../containers/MongoDBContainer";
import User from "../models/User";
import UserDTO from '../DTOs/UserDTO';

let instance: null | UserRepository = null;

export default class UserRepository {
  container = new MongoDBContainer(User);

  static getInstance(): UserRepository {
    if (instance) {
      return instance;
    }
    instance = new UserRepository();
    return instance;
  }

  async save(user: any) {
    try {
      const newUser = await this.container.save(user);
      return new UserDTO(newUser);
    } catch (e) {
      console.log(e);
      return { errors: "Error saving user" };
    }
  }

  async getAll() {
    try {
      const users = await this.container.getAll();
      return users.map(user => new UserDTO(user));
    } catch (e) {
      console.log(e);
      return { error: "Error fetching users" };
    }
  }

  async getById(id: string) {
    try {
      const user = await this.container.getById(id);
      if (user) {
        return new UserDTO(user);
      }
      return { errors: "User not found" };
    } catch (e) {
      console.log(e);
      return { errors: "Error fetching user" };
    }
  }

  async getByEmail(email: string) {
    try {
      const users = await this.container.getAll();
      const user = users.find((user: any) => user.email === email);
      if (user) {
        return {...new UserDTO(user), password: user.password};
      }
      return { errors: "User not found" };
    } catch (e) {
      console.log(e);
      return { errors: "Error fetching user" };
    }
  }

  async update(id: string, updatedUser: any) {
    try {
      const user = await this.container.update(id, updatedUser);
      if (user) {
        return new UserDTO(user);
      }
      return { errors: "User not found" };
    } catch (e) {
      console.log(e);
      return { errors: "Error updating user" };
    }
  }

  async deleteById(id: string) {
    try {
      const user = await this.container.deleteById(id);
      if (user) {
        return { success: true };
      }
      return { errors: "User not found" };
    } catch (e) {
      console.log(e);
      return { errors: "Error removing user" };
    }
  }

  async deleteAll() {
    try {
      await this.container.deleteAll();
      return { success: true };
    } catch (e) {
      console.log(e);
      return { errors: "Error removing users" };
    }
  }
}
