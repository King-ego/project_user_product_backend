import { Router } from 'express';

import UserRoutes from './user.routes';
import ProductRoutes from './products.routes';
import SessionRoute from './session.routes';

const routes = Router();

routes.use('/', UserRoutes);
routes.use('/', ProductRoutes);
routes.use('/', SessionRoute);

export default routes;
