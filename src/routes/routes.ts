import { Router } from 'express';
import { LoginController } from '../controllers/LoginController';
import { BalanceUserController, UserController } from '../controllers/UserController';
import { schemaValidation } from '../middlewares/schemaValidator';
import { userSchema } from '../validations/UserSchema';
import { authenticationFilter } from '../middlewares/authentication';
import { TransactionController } from '../controllers/TransactionController';

const routes = Router();

const userController = new UserController();
const loginController = new LoginController();
const balanceUserController = new BalanceUserController();
const transactionController = new TransactionController();

routes.post('/user', schemaValidation(userSchema), userController.create);
routes.post('/login', loginController.create);

routes.use(authenticationFilter);

routes.get('/user/balance', balanceUserController.read);
routes.post('/transfer', transactionController.create);

export default routes;