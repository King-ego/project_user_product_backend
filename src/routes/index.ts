import { Router } from 'express';

import UserRoutes from './user.routes';
import ProductRoutes from './products.routes';

const routes = Router();

routes.use('/', UserRoutes);
routes.use('/', ProductRoutes);

export default routes;
