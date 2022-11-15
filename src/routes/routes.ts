import { Router } from 'express';
import { LoginController } from '../controllers/LoginController';
import { UserController } from '../controllers/UserController';

const routes = Router();

const userController = new UserController();
const loginController = new LoginController();

routes.post('/user', userController.create);
routes.post('/login', loginController.create);

export default routes;