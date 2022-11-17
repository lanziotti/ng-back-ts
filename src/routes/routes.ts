import { Router } from 'express';
import { LoginController } from '../controllers/LoginController';
import { BalanceUserController, UserController } from '../controllers/UserController';
import { schemaValidation } from '../middlewares/schemaValidator';
import { userSchema } from '../validations/UserSchema';
import { authenticationFilter } from '../middlewares/authentication';
import { ExtractController, TransactionController, TransactionFilterController } from '../controllers/TransactionController';

const routes = Router();

const userController = new UserController();
const loginController = new LoginController();
const balanceUserController = new BalanceUserController();
const transactionController = new TransactionController();
const extractController = new ExtractController();
const transactionFilterController = new TransactionFilterController();

routes.post('/user', schemaValidation(userSchema), userController.create);
routes.post('/login', loginController.create);

routes.use(authenticationFilter);

routes.get('/user/balance', balanceUserController.read);
routes.post('/transfer', transactionController.create);
routes.get('/user/extract', extractController.read);
routes.get('/user/search', transactionFilterController.read);

export default routes;