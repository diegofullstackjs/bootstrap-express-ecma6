import {Router} from 'express'
import UserRoutes from './router/user'
import IndexRoutes from './router/index'


const Routes = Router();

Routes.use('/',IndexRoutes)
Routes.use('/users',UserRoutes)

export default Routes;