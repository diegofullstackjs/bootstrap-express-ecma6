import {Router} from 'express'
import UserController from '../../controllers/Users'
const Routes = Router();

Routes.get('/',UserController.index)

export default Routes;