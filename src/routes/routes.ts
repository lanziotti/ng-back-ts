import { Router } from 'express';
import { LoginController } from '../controllers/LoginController';
import { UserController } from '../controllers/UserController';
import { schemaValidation } from '../middlewares/schemaValidator';
import { userSchema } from '../validations/UserSchema';

const routes = Router();

const userController = new UserController();
const loginController = new LoginController();

routes.post('/user', schemaValidation(userSchema), userController.create);
routes.post('/login', loginController.create);

export default routes;