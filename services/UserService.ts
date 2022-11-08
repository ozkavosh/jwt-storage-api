import UserRepository from "../repositories/UserRepository";
import { isValidSignUpUser } from "../utils/yup-schemas/userSchema";
import { encryptPassword } from "../utils/password";

let instance: null | UserService = null;

export default class UserService{
    repository: UserRepository;
    
    constructor(repository: UserRepository){
        this.repository = repository;
    }

    static getInstance(repository: UserRepository): UserService{
        if(instance){
            return instance;
        }

        instance = new UserService(repository);
        return instance;
    }

    async save(object: any) {
        try {
          await isValidSignUpUser(object);
          const users: any = await this.repository.getAll();
          if(users.some((user: any) => user.email === object.email)) return { errors: "User email already exists" };
          return await this.repository.save({...object, password: encryptPassword(object.password)});
        } catch (e: any) {
          console.log("Errors saving user: " + e.errors.join(" - "));
          return { errors: e.errors.join(" - ") };
        }
      }
    
      async getAll() {
        return await this.repository.getAll();
      }
    
      async getById(id: string) {
        if (typeof id !== "string") return { errors: "User id must be a string" };
        return await this.repository.getById(id);
      }
    
      async getByEmail(email: string) {
        if (typeof email !== "string") return { errors: "User email must be a string" };
        return await this.repository.getByEmail(email);
      }
    
      async update(id: string, object: Object) {
        try {
          await isValidSignUpUser(object);
          return await this.repository.update(id, object);
        } catch (e: any) {
          console.log("Errors updating user: " + e.errors.join(" - "));
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