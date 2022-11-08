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
const userSchema_1 = require("../utils/yup-schemas/userSchema");
const password_1 = require("../utils/password");
const jwt_1 = require("../utils/jwt");
class UserController {
    constructor(service) {
        this.service = service;
    }
    postUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            if (user) {
                const newUser = yield this.service.save(user);
                if (!("errors" in newUser)) {
                    return res.json(newUser);
                }
                else {
                    return res.status(402).json(newUser);
                }
            }
            return res.status(402).json({ error: "Missing request body" });
        });
    }
    postLogin(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body;
                yield (0, userSchema_1.isValidSignInUser)(user);
                const userResult = yield this.service.getByEmail(user.email);
                if ("errors" in userResult || !(0, password_1.isValidPassword)(userResult, user.password))
                    throw { errors: ["Wrong credentials"] };
                delete userResult.password;
                const token = (0, jwt_1.generateAccessToken)(userResult);
                res.json({ token });
            }
            catch (e) {
                console.log(e);
                return res.status(400).json({ errors: (_a = e.errors) === null || _a === void 0 ? void 0 : _a.join(" - ") });
            }
        });
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.service.getAll();
            if (users) {
                return res.json(users);
            }
            return res.status(500).json({ error: "Server error" });
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (id) {
                const user = id.includes("@")
                    ? yield this.service.getByEmail(id)
                    : yield this.service.getById(id);
                if (!("errors" in user)) {
                    user.password && delete user.password;
                    return res.json(user);
                }
                else {
                    return res.status(402).json(user);
                }
            }
            return res.status(402).json({ error: "Missing user id" });
        });
    }
    putUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const user = req.body;
            if (user && id) {
                const newUser = yield this.service.update(id, user);
                if (!("errors" in newUser)) {
                    return res.json(newUser);
                }
                else {
                    return res.status(402).json(newUser);
                }
            }
            return res.status(402).json({ error: "Missing request body or user id" });
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (id) {
                const deleteResult = yield this.service.deleteById(id);
                if (deleteResult) {
                    return res.json(deleteResult);
                }
                else {
                    return res.status(402).json('User not found');
                }
            }
            return res.status(402).json({ error: "Missing user id" });
        });
    }
    deleteUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json(yield this.service.deleteAll());
        });
    }
}
exports.default = UserController;
