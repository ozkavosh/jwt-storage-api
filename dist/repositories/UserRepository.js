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
const User_1 = __importDefault(require("../models/User"));
const UserDTO_1 = __importDefault(require("../DTOs/UserDTO"));
let instance = null;
class UserRepository {
    constructor() {
        this.container = new MongoDBContainer_1.default(User_1.default);
    }
    static getInstance() {
        if (instance) {
            return instance;
        }
        instance = new UserRepository();
        return instance;
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield this.container.save(user);
                return new UserDTO_1.default(newUser);
            }
            catch (e) {
                console.log(e);
                return { errors: "Error saving user" };
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.container.getAll();
                return users.map(user => new UserDTO_1.default(user));
            }
            catch (e) {
                console.log(e);
                return { error: "Error fetching users" };
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.container.getById(id);
                if (user) {
                    return new UserDTO_1.default(user);
                }
                return { errors: "User not found" };
            }
            catch (e) {
                console.log(e);
                return { errors: "Error fetching user" };
            }
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.container.getAll();
                const user = users.find((user) => user.email === email);
                if (user) {
                    return Object.assign(Object.assign({}, new UserDTO_1.default(user)), { password: user.password });
                }
                return { errors: "User not found" };
            }
            catch (e) {
                console.log(e);
                return { errors: "Error fetching user" };
            }
        });
    }
    update(id, updatedUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.container.update(id, updatedUser);
                if (user) {
                    return new UserDTO_1.default(user);
                }
                return { errors: "User not found" };
            }
            catch (e) {
                console.log(e);
                return { errors: "Error updating user" };
            }
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.container.deleteById(id);
                if (user) {
                    return { success: true };
                }
                return { errors: "User not found" };
            }
            catch (e) {
                console.log(e);
                return { errors: "Error removing user" };
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
                return { errors: "Error removing users" };
            }
        });
    }
}
exports.default = UserRepository;
