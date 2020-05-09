import {Router} from 'express'
import HomeController from '../../controllers/Home'
const Routes = Router();

Routes.get('/',HomeController.index)

export default Routes;