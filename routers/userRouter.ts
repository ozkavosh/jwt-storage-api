import { Router } from 'express';
import UserRepository from '../repositories/UserRepository';
import UserService from '../services/UserService';
import UserController from '../controllers/UserController';

const userRepository = UserRepository.getInstance();
const userService = UserService.getInstance(userRepository);
const userController = new UserController(userService);
const userRouter = Router();

userRouter.post('/signup', userController.postUser.bind(userController));
userRouter.post('/signin', userController.postLogin.bind(userController));
userRouter.get('/', userController.getUsers.bind(userController));
userRouter.get('/:id', userController.getUser.bind(userController));
userRouter.put('/:id', userController.putUser.bind(userController));
userRouter.delete('/:id', userController.deleteUser.bind(userController));
userRouter.delete('/', userController.deleteUsers.bind(userController));

export default userRouter;

